'use strict';
var React = require('react-native');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

var {
  AppRegistry,
  Navigator,
  View,
} = React;

class Login extends React.Component {
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
    this.setState({user: null});
  }

  render() {
    var _this = this;
    return (
      <View>
        <FBLogin style={{ marginBottom: 10 }}
          permissions={["email", "user_friends"]}
          onLogin={function(data) {
            console.log('Logged in!');
            console.log(data);
            _this.setState({user: data.credentials});
            _this.props.onLogin(data.credentials);
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
            // _this.setState({user: null});
            // _this.handleLogout();
            console.log('_this.handleLogout error goes here');
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
  } // end of render()
}; // end of Login

module.exports = Login;
