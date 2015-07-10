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
class locationTest extends React.Component {

  // don't need a function keyword here
  constructor(props) {
    super(props); // you have to call super before you can attach properties
    this.state = {
      position: {
        coords: {}
      }
    };
  } // look ma, no commas!

  getInitialState() {
    return {
      annotations: [{
        title: 'annotation',
      }]
    }
  }

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

  componentDidMount() {
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
  // title: {
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   alignSelf: 'flex-end',
  //   textAlign: 'center',
  //   marginTop: 20,
  // },
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

AppRegistry.registerComponent('locationTest', () => locationTest);
