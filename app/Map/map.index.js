var React = require('react-native');
var styles = require('./map.styles.js');
var secrets = require('../../secrets.js');

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
    // super() MUST be called beforing refering to the 'this' of the Waypoint subclass
    super(props); 
    this.state = {
      position: {
        coords: {}
      },
      waypoints: {
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
        number: 3
      },
      distance: 0,
      current: 0,
      directions: {}
    };
    this.state.currentWaypoint = this.state.waypoints.annotations[0];
  } // look ma, no commas!


  _getDistanceToNextPoint() {
    var pos1 = this.state.position.coords;
    var pos2 = this.state.waypoints.annotations[this.state.current];
    var latDist = pos1.latitude - pos2.latitude;
    var longDist = pos1.longitude - pos2.longitude;
    return Math.sqrt( Math.pow(latDist, 2) + Math.pow(longDist, 2) );
  }

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
      console.log('response from server: ', response);
      var mapquestDirections = JSON.parse(response._bodyText);
      var directions = {};
      directions.distance = mapquestDirections.route.distance;
      directions.time = mapquestDirections.route.formattedTime;
      directions.legs = mapquestDirections.route.legs;
      context.setState({directions});
      console.log('Next waypoint: ', context.state.currentWaypoint);
      console.log('Directions in state: ', context.state.directions);
     })
     .catch((error) => {
      console.warn(error);
     });
  }

  //Add title and current location to map
  render() {
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.map}
          region={{
            latitude: this.state.position.coords.latitude,
            latitudeDelta: 0.001,
            longitude: this.state.position.coords.longitude,
            longitudeDelta: 0.001,
          }}
          showsUserLocation={true}
          annotations={ [this.state.currentWaypoint] }
         />
         <Text style={styles.coords}>
           Distance: {this.state.distance}
         </Text>
      </View>
    );
  }

  _onNextPress()  {
    console.log('Moving on!');
    var next = this.state.current < this.state.waypoints.number - 1 ? this.state.current + 1 : null;
    this.setState({current: next});
    if (next) {
      this.setState({currentWaypoint: this.state.waypoints.annotations[next]});
      this._getDirectionsToNextPoint();
    } 
  }

  _handleArrival() {
    var context = this;
    var currentWaypoint = this.state.waypoints.annotations[this.state.current];
    var next = this.state.current < this.state.waypoints.number - 1 ? this.state.current + 1 : null;
    var alertText = next ? 'Next Waypoint' : 'Done!';
    if (currentWaypoint) {
      AlertIOS.alert(
        currentWaypoint.title,
        currentWaypoint.subtitle,
        [
          {text: alertText, onPress: context._onNextPress.bind(context)},
        ]
      )
    }
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
        context._getDirectionsToNextPoint();
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      context.setState({position});
      context.setState({distance: context._getDistanceToNextPoint()});
      // if (context.state.distance <= 0.0005) {
      //   context._handleArrival();
      // }
    });
    setTimeout(this._handleArrival.bind(this), 6000);
    setTimeout(this._handleArrival.bind(this), 12000);
    setTimeout(this._handleArrival.bind(this), 16000);

  }
}

module.exports = Map;
