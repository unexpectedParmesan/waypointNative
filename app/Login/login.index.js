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

  constructor(props){
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
