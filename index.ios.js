'use strict';

var React = require('react-native');
var Login = require('./app/Login/login.index.js');
var Begin = require('./app/Login/begin.index.js');
var styles = require('./app.styles.js');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

var FBUrl = 'https://graph.facebook.com/v2.2/';

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
      user: null,
      entry: <Login onLogin={this.handleLogin.bind(this)}/>
    }
  }

  handleLogout() {
    this.setState({user: null});
    console.log('We have made it all the way to Waypoint.');
    var _this = this;
    FBLoginManager.logout(function(error, data){
      if (!error) {
        _this.setState({ user : null});
        _this.setState({entry: <Login onLogin={_this.handleLogin.bind(_this)}/>});
      } else {
        console.log(error, data);
      }
    });
  }

  handleLogin(data) {
    // this.setState({user: data}, () => {
    //   this.setState({ entry: <Begin {...this.state} onLogout={this.handleLogout.bind(this)} />});
    // });
    this._getUserProfile(data);
  }

  _getNameUrl(data) {
    var token = data.credentials.token;
    var userId = data.credentials.userId;
    var url = FBUrl + userId + '/?' + 'access_token=' + token;
    return url;
  }

  _getPhotoUrl(data) {
    var token = data.credentials.token;
    var userId = data.credentials.userId;
    var url = FBUrl + userId + '/picture/?access_token=' + token + '&redirect=false';
    return url;
  }

  _getUserProfile(data) {
    var userData = {};
    userData.userId = data.credentials.userId;
    var nameUrl = this._getNameUrl(data);

    fetch(nameUrl)
     .then((response) => {
        userData.name = JSON.parse(response._bodyText).name;
        var photoUrl = this._getPhotoUrl(data);

        fetch(photoUrl)
         .then((response) => {
           var photoUrl = JSON.parse(response._bodyText).data.url;
           userData.photoUrl = photoUrl;
           console.log('photo response from FB: ', photoUrl);
           this.setState( {user: userData}, () => {
             console.log('State after response from FB: ', this.state);
             this.setState({ entry: <Begin {...this.state} onLogout={this.handleLogout.bind(this)} />});
           })
         })
         .catch((error) => {
          console.warn(error);
         });
     })
     .catch((error) => {
      console.warn(error);
     });
  }


  componentWillMount() {
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        _this._getUserProfile(data);
      }
    });
  }

  // - Waypoint renders a Navigator to render the main app scene
  // - The Navigator component defines Main as its initialRoute
  // - renderScene() renders Main
  render() {
    return (
      this.state.entry
    )
  } // end of render()
} // end of Waypoint

AppRegistry.registerComponent('Waypoint', () => Waypoint);

module.exports = 'Waypoint';
