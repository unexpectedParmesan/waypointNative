'use strict';

var React = require('react-native');
var Login = require('./app/Login/login.index.js');
var Begin = require('./app/Login/begin.index.js');
var styles = require('./app.styles.js');

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

var FBUrl = 'https://graph.facebook.com/v2.2/'; // root url for FB API

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
      // baseUrl: 'https://waypointserver.herokuapp.com/',
      baseUrl: 'http://127.0.0.1:3000/',
      // "Entry" defines what view is rendered.
      // It needs to be in the state because render() is only called once.
      // Because "entry" is a state variable, it auto-updates depending whether user is logged in.
      // handleLogin is passed as a property to the Login view so that when the user logs in,
      // the user data is loaded into the state at the index level.
      entry: <Login onLogin={this.handleLogin.bind(this)}/>
    }
  }

    // handles logout both through Facebook and by setting the relevant state variables.
    // when user logs out, user becomes null and we reset the view variable ("entry")
    // to display the FB login button.
  handleLogout(data) {
    var context = this;
    FBLoginManager.logout(function(error, data) {
      if (!error) {
        context.setState({ user : null});
        context.setState({entry: <Login onLogin={ context.handleLogin.bind(context) }/>});
      } else {
        console.log(error, data);
      }
    });
  }


  // on login, user data gets loaded into the state and passed to child views.
  handleLogin(data) {
    this._getUserProfile(data);
  }

  // returns endpoint to get name from FB API.
  // the access token is provided by the FBLoginManager on login or verification of credentials.
  _getNameUrl(data) {
    var token = data.credentials.token;
    var userId = data.credentials.userId;
    var url = FBUrl + userId + '/?' + 'access_token=' + token;
    return url;
  }

  // returns endpoint to get a photo url from FB API
  _getPhotoUrl(data) {
    var token = data.credentials.token;
    var userId = data.credentials.userId;
    var url = FBUrl + userId + '/picture/?access_token=' + token + '&redirect=false&width=200&height=200';
    return url;
  }

   // once we have all user data we want, we set the user and the current view to reflect logged-in status.
   // we pass handleLogout as a prop to the child view so that the logout view is rendered should the
   // user log out at any time.
  _setUserData(userData) {
    this.setState( {user: userData}, () => {
      this.setState({ entry: <Begin {...this.state} onLogout={ this.handleLogout.bind(this) } />});    
    })
  }

  // builds up an object of user data by successive fetch calls to the Facebook API,
  // then sets the relevant state variables.
  _getUserProfile(data) {

    var userUrl = this.state.baseUrl + 'users/' + data.credentials.userId;

    console.log('this url: ', userUrl);
    // check that user is in db; if not, sends a POST request
    fetch(userUrl)
      .then((response) => {
         console.log('response to GET request to users endpoint: ', response);
         var userData = {};
          userData.userId = data.credentials.userId;

         if (response.status === 404) {

          var nameUrl = this._getNameUrl(data);
          fetch(nameUrl)
           .then((response) => {
              console.log('Got name from FB: ', response);
              userData.name = JSON.parse(response._bodyText).name; // collects name from API

              var photoUrl = this._getPhotoUrl(data);

              fetch(photoUrl)
               .then((response) => {
                 userData.photoUrl = JSON.parse(response._bodyText).data.url; // collects photo URL from API

                 fetch(userUrl, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ facebookId: userData.userId, name: userData.name, profilePic: userData.photoUrl })
                 })
                  .then((response) => {
                   this._setUserData(userData);
                   console.log('POST request sent to server. Here is the response: ', response);    
                  })

               })
               .catch((error) => {
                 console.warn(error);
               });
           })
           .catch((error) => {
            console.warn(error);
           });
         } else {
           var responseBody = JSON.parse(response._bodyText);
           console.log('response body from server: ', responseBody);
           userData.name = responseBody.name;
           userData.photoUrl = responseBody.profile_pic;
           this._setUserData(userData);
         }
      }).catch((error) => {
        console.warn('server error: ', error);
      });



  }


  // before component mounts, get user credentials. if they exist, load them into user profile (same as on login)
  componentWillMount() {
    var context = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        context._getUserProfile(data);
      }
    });
  }

  componentWillUnmount() {
    console.log('calling componentWillUnmount');
  }

  render() {
    return (
      this.state.entry // user's entry into Waypoint differs depending on whether logged in or not
    )
  } // end of render()
} // end of Waypoint

AppRegistry.registerComponent('Waypoint', () => Waypoint);

module.exports = 'Waypoint';
