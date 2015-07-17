'use strict';

var React = require('react-native');
var Main = require('../Main/main.index.js');
var styles = require('./begin.styles.js');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

var {
  AppRegistry,
  Navigator,
  View,
} = React;


class Begin extends React.Component {
  // Don't need the function keyword when defining functions.
  // The constructor function is executed when a new instance of the Waypoint is being created
  // Props is the object passed new Waypoint(), e.g., new Waypoint({ prop1: value, prop2: value })
  constructor(props){
    // super(props) creates a new instance of the superclass
    // In this case the superclass is React.Component
    // super(props) does the same thing that SuperClass.call(this, props) does in pseudoclassical style
    // super() MUST be called before refering to the 'this' of the Waypoint subclass
    super(props);
    this.state = {
      user: props.user,
      onLogout: function() {
        console.log('onLogout function in WaypointBegin state');
        this.handleLogout();
      }
    }
  }

  handleLogout() {
    console.log('calling handleLogout at the WaypointBegin level');
    this.setState({user: null});
    this.props.onLogout();
  }

  // - Waypoint renders a Navigator to render the main app scene
  // - The Navigator component defines Main as its initialRoute
  // - renderScene() renders Main
  render() {
    return (
      <Navigator
        style={styles.wrapper}
        initialRoute={{
          component: Main
        }}
        renderScene={(route, navigator) =>
          <Main {...this.state}
            onLogout={this.handleLogout.bind(this)}
            name={route.name}
            navigator={navigator}/>
        }/>
    ) 
  } // end of render()
}; // end of Waypoint


module.exports = Begin;
