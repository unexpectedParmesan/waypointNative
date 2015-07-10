/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
} = React;

// with class definition syntax we extend Component instead of calling createClass
class Waypoint extends React.Component {

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
      }
    };
  } // look ma, no commas!

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
         />
         <Text style={styles.coords}>
           {this.state.position.coords.latitude}, {this.state.position.coords.longitude}
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
      (position) => this.setState({position}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      this.setState({position});
    });

  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  coords: {
    // fontWeight: 'bold',
    fontSize: 24,
    // color: '#dddddd',
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 12,
    bottom: 60,
    margin: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
  },
});

AppRegistry.registerComponent('Waypoint', () => Waypoint);
