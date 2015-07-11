var React = require('react-native');
var styles = require('./map.styles.js')
var {
  Text,
  View,
  ListView,
  MapView,
  Image,
  TouchableHighlight,
  SegmentedControlIOS,
  AlertIOS,
  AppStateIOS
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
      }
    };
  } // look ma, no commas!

  getInitialState() {
    return {
      annotations: [{
        // latitude: this.state.position.coords.latitude,
        // longitude: this.state.position.coords.longitude,
        // title: 'Hack Reator',
        // subtitle: 'you are here'
      }]
    }
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
          annotations={[{latitude: 37.783366,
                         longitude: -122.406831,
                         title: 'Cafe Venue',
                         subtitle: 'quick noshes'}]}/>
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

module.exports = Map;