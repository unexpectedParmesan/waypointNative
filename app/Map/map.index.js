var React = require('react-native');
var styles = require('./map.styles.js');
var secret = require('../../secrets.js');

var {
  Text,
  View,
  MapView,
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
        annotations: [{latitude: 37.780900,
                      longitude: -122.405627,
                      title: 'Tin Vietnamese',
                      subtitle: 'classic Vietnamese eats'
                      }]
      },
      distance: 0
    };
  } // look ma, no commas!


  _getDistanceToNextPoint() {
    var pos1 = this.state.position.coords;
    var pos2 = this.state.waypoints.annotations[0];
    var latDist = pos1.latitude - pos2.latitude;
    var longDist = pos1.longitude - pos2.longitude;
    // var origin = 'origin=' + pos1.latitude + ',' + pos1.longitude;
    // var destination = 'destination=' + pos2.latitude + ',' + pos2.longitude;
    var key = secret.googleMaps;
    // var url = 'https://maps.googleapis.com/maps/api/directions/json?' + origin + '&' + destination + '&key=' + key;
    // fetch(url)
    //  .then((response) => response.text())
    //  .then((responseText) => {
    //   console.log(responseText);
    //  })
    //  .catch((error) => {
    //   console.warn(error);
    //  });
    return Math.sqrt( Math.pow(latDist, 2) + Math.pow(longDist, 2) );
  }

  //Add title and current location to map
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Waypoint
        </Text>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.position.coords.latitude,
            latitudeDelta: 0.001,
            longitude: this.state.position.coords.longitude,
            longitudeDelta: 0.001,
          }}
          showsUserLocation={true}
          annotations={this.state.waypoints.annotations}
         />
         <Text style={styles.coords}>
           Distance: {this.state.distance}
         </Text>
      </View>
    );
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        console.log('Distance: ', this.state.distance);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      console.log('watching position...')
      this.setState({position});
      this.setState({distance: this._getDistanceToNextPoint()});
      console.log('setting distance: ' + this.state.distance);
      if (this.state.distance <= 0.00005) {
        this.setState({distance: 'ARRIVED!'});
      }
    });

  }
}

module.exports = Map;