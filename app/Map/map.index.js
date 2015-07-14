var React = require('react-native');
var styles = require('./map.styles.js');
var secrets = require('../../secrets.js'); // for access to .gitignored API keys

var {
  Text,
  View,
  MapView,
  AlertIOS,
  } = React;

class Map extends React.Component {
  
  // Don't need the function keyword when defining functions.
  // The constructor function is executed when a new instance of the Waypoint is being created
  // Props is the object passed new Waypoint(), e.g., new Waypoint({ prop1: value, prop2: value })
  constructor(props) {
    // super(props) creates a new instance of the superclass
    // In this case the superclass is React.Component
    // super(props) does the same thing that SuperClass.call(this, props) does in pseudoclassical style
    // super() MUST be called before refering to the 'this' of the Waypoint subclass
    super(props); 
    this.state = {
      position: {
        coords: {} // initializes geolocation coordinates to be populated by navigator
      },
      waypoints: { // hard-coded path: this will soon be passed in as props
        annotations: [{
                       latitude: 37.783872,
                       longitude: -122.408972,
                       title: 'Hack Reactor',
                       subtitle: 'Coding!',
                      },
                      {
                       latitude: 37.781966,
                       longitude: -122.411277,
                       title: 'The Hall',
                       subtitle: 'Hipster eatery',
                      },
                      {
                       latitude: 37.781342,
                       longitude: -122.406273,
                       title: 'Tempest',
                       subtitle: 'Beer!',
                      }],
        number: 3 // number of waypoints in the path. this will also be passed in as props
      },
      /*  coordinate distance between waypoints (computed using pythygorean theorem) --
          used for live-updating distance in miles via proportion to coordinate distance
       */
      distance: 0, // coordinate distance between waypoints (computed using pythygorean theorem)
      currentDistance: 0, // current distance from next waypoint
      miles: 0, // distance in miles between waypoints (fetched via one API call)
      currentMiles: 0, // human-readable distance in miles from next waypoint
      // time: 0,  // uncomment if we want to track estimated time
      // currentTime: 0, // uncomment if we want to track estimated time
      currentIndex: 0, // index of current waypoint; may be made obsolete after db integration
      directions: {}, // initialized object to hold MapQuest data
      alertShowing: false // tells whether an IOSAlert is currently showing: prevents 
    };
    this.state.currentWaypoint = this.state.waypoints.annotations[0]; // initializes current waypoint
  } // look ma, no commas!


  /* Returns distance in coordinates (calculated using the pythygorean theorem) between the user's current position and
   * the next waypoint.
  */
  _getDistanceToNextPoint() {
    var pos1 = this.state.position.coords;
    var pos2 = this.state.currentWaypoint;
    var latDist = pos1.latitude - pos2.latitude;
    var longDist = pos1.longitude - pos2.longitude;
    return Math.sqrt( Math.pow(latDist, 2) + Math.pow(longDist, 2) );
  }

   /* Returns the url required for a MapQuest directions API call that returns distance in miles, along with
    * a good deal of unused information.
   */
  _getDirectionsUrl() {
    var pos1 = this.state.position.coords;
    var pos2 = this.state.currentWaypoint;
    var from= 'from=' + pos1.latitude + ',' + pos1.longitude;
    var to = 'to=' + pos2.latitude + ',' + pos2.longitude;
    var key = secrets.mapQuest;
    return 'http://www.mapquestapi.com/directions/v2/route?key=' + key + '&' + from + '&' + to + '&routeType=pedestrian';
  }

  _getDirectionsToNextPoint() {
    var url = this._getDirectionsUrl();
    var context = this;
    fetch(url)
     .then((response) => {
      var mapquestDirections = JSON.parse(response._bodyText);
      var directions = {};
      directions.distance = mapquestDirections.route.distance;
      // directions.time = mapquestDirections.route.formattedTime; // useful only if we want to display est. time info
      // directions.legs = mapquestDirections.route.legs; // useful only if we want to give explicit directions
      context.setState({directions}, () => {
        context.setState({miles: directions.distance}, () => {
          context.setState({currentMiles: context._milesToEnglish(context.state.miles)});
        });
        // context.setState({time: directions.time}, () => {
        //   context.setState({currentTime: context.state.time}); // uncomment if we want to display estimated time
        // });
        context.setState({distance: context._getDistanceToNextPoint()});
        // setTimeout(context._handleArrival.bind(context), 12000); // desktop debugging code for simulating arrival
      });
     })
     .catch((error) => {
      console.warn(error);
     });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}></Text> // title: displays above map; passed in as a property
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.position.coords.latitude || 37.785834, // latitude of map center
            latitudeDelta: 0.001, // governs map height
            longitude: this.state.position.coords.longitude || -122.406417, // longitude of map center
            longitudeDelta: 0.001, // governs map width
          }}
          showsUserLocation={true} // displays blue dot for current user location
          annotations={ [this.state.currentWaypoint] } // pins shown on map; needs to be an array
         />
         <Text style={styles.coords}>
           Distance: {this.state.currentMiles}
         </Text>
      </View>
    );
  }

  /* Invoked when the user presses "next" in an alert.
   * Updates the state as the user moves on to the next waypoint.
  */
  _onNextPress()  {
    var next = this.state.currentIndex < this.state.waypoints.number - 1 ? this.state.currentIndex + 1 : null;
    var context = this;
    this.state.alertShowing = false;
    this.setState({current: next}, () => {
      if (next) {
        context.setState({currentWaypoint: context.state.waypoints.annotations[next]}, () => {       
          context._getDirectionsToNextPoint();
        });
      }   
    });
  }

  _handleArrival() {
    var context = this;
    var currentWaypoint = this.state.waypoints.annotations[this.state.current];
    var next = this.state.currentIndex < this.state.waypoints.number - 1 ? this.state.currentIndex + 1 : null;
    var alertText = next ? 'Next Waypoint' : 'Done!';
    if (currentWaypoint) {
      this.state.alertShowing = true;
      AlertIOS.alert(
        'Arrived at '  + currentWaypoint.title,
        currentWaypoint.subtitle,
        [
          {text: alertText, onPress: context._onNextPress.bind(context)},
        ]
      )
    }
  }

  _initPath() {
    this._getDirectionsToNextPoint();
  }

  _roundMiles(miles) {
    var leftOfDecimal = Math.trunc(miles);
    var rightOfDecimal = (miles - leftOfDecimal + '').split('.')[1];
    rightOfDecimal = rightOfDecimal.slice(0, 2);
    return leftOfDecimal + '.' + rightOfDecimal;
  }

  _milesToEnglish(miles) {
    if (miles === 0) {
      return '0 ft';
    }
    if (miles > 0.18) {
      var rounded = this._roundMiles(miles);
      return rounded + ' mi';
    } else {
      var feet = miles * 5280 + '';
      return feet.split('.')[0] + ' ft';
    }
  }

  _getCurrentDistanceInMiles() {
    if (this.state.miles === 0 || this.state.currentDistance === 0 || this.state.distance === 0) {
      return 0;
    }
    var miles = this.state.miles * (this.state.currentDistance / this.state.distance);
    return this._milesToEnglish(miles);
  }

  // this function will execute after rendering on the client occurs
  componentDidMount() {
   
    // navigator is available via the Geolocation polyfill in React Native
    // http://facebook.github.io/react-native/docs/geolocation.html#content
    //
    // navigator is the object through which you interact with the Geolocation interface
    //
    // *** Polyfill definition needs to be verified
    // React Native allows for polyfills--code that provides functionality available in the browser, but
    // that is not currently available in the runtime environment on mobile devices ***
    // Geolocation is enabled by default when you create a project with react-native init.
    //
    // getCurrentPosition() and watchPostion() take a success callback, error callback, and options object 
    var context = this;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        context.setState({position});
        context._initPath();
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      context.setState({position}, () => {
        if (context.state.currentIndex !== null) {
          context.setState({currentDistance: context._getDistanceToNextPoint()}, () => {
            context.setState({currentMiles: context._getCurrentDistanceInMiles()});
            if (context.state.currentDistance <= 0.0005 && !context.state.alertShowing) {
              context._handleArrival();
            }
          });  
        }
      });
    });

  }
}

module.exports = Map;
