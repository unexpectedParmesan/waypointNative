'use strict';
var React = require('react-native');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;
var styles = require('./begin.styles.js');

var {
  Navigator,
  View,
} = React;

class Login extends React.Component {

  constructor(props){
    super(props);
  }


  render() {
    var context = this;
    // if user isn't logged in, displays "log in with facebook" button.
    // onLogin is called if user clicks that button.
    return (
      <View style={styles.loginContainer} >
        <FBLogin style={styles.login}
          permissions={["email", "user_friends"]}
          onLogin={function(data) {
            console.log('Logged in!');
            console.log(data);
            context.props.onLogin(data);
          }}
          onLoginFound={function(data) {
            console.log('Existing login found');
            console.log(data);
          }}
          onLoginNotFound={function(data) {
            console.log('No user logged in');
          }}
          onError={function(data) {
            console.log('ERROR');
            console.log(data);
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
