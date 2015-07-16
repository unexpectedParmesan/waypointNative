'use strict';

var React = require('react-native');
var Main = require('./app/Main/main.index.js');
var styles = require('./app.styles.js');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

var {
  AppRegistry,
  Navigator,
  View,
} = React;

// With subclass definition syntax we extend Component instead of calling createClass
class Waypoint extends React.Component {
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
      user: null
    }
  }

  handleLogout() {
    var _this = this;
    FBLoginManager.logout(function(error, data){
      console.log('logging out');
      // if (!error) {
      //   _this.setState({ user : null});
      // } else {
      //   console.log(error, data);
      // }
    });
  }

  renderLogin() {
    var _this = this;
    return (
      <View style={styles.container}>
        <FBLogin
          style={{ marginBottom: 10 }}
          permissions={["email", "user_friends"]}
          onLogin={function(data) {
            console.log('Logged in!');
            console.log(data);
            _this.setState({user: data.credentials});
          }}
          onLoginFound={function(data) {
            console.log('Existing login found');
            console.log(data);
            _this.setState({user: data.credentials});
          }}
          onLoginNotFound={function(data) {
            console.log('No user logged in');
            _this.setState({user: null});
          }}
          onLogout={function(data) {
            _this.setState({user: null});
            _this.handleLogout();
            console.log('logging out');
          }}
          onError={function(data) {
            console.log('ERROR');
            console.log(data);
          }}
          onCancel={function() {
            console.log('user cancelled');
          }}
          onPermissionsMissing={function(data) {
            console.log('Permissions missing.');
            console.log(data);
          }}
        />
      </View>
    );
  }

  renderIntro() {
    return (
      <Navigator
        style={styles.wrapper}
        initialRoute={{
          component: Main
        }}
        renderScene={(route, navigator) =>
          <Main
            name={route.name}
            navigator={navigator}/>
        }/>
    ) 
  }
  // - Waypoint renders a Navigator to render the main app scene
  // - The Navigator component defines Main as its initialRoute
  // - renderScene() renders Main
  render() {
    // if (this.state.user) {
    //   return this.renderIntro();
    // } else {
      return this.renderLogin();
    // }
  } // end of render()
} // end of Waypoint

AppRegistry.registerComponent('Waypoint', () => Waypoint);

module.exports = 'Waypoint';
    // return (
    //   <Navigator
    //     style={styles.wrapper}
    //     initialRoute={{
    //       component: Main
    //     }}
    //     renderScene={(route, navigator) =>
    //       <Main
    //         name={route.name}
    //         navigator={navigator}/>
    //     }/>
    // )