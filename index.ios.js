/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./app/Main/main.index.js');
var styles = require('./app.styles.js');

var {
  AppRegistry,
  Text,
  View,
  NavigatorIOS,
  MapView,
} = React;

// With subclass definition syntax we extend Component instead of calling createClass
class Waypoint extends React.Component {

  render(){
    return (
      <Main />
    )
  }
}

AppRegistry.registerComponent('Waypoint', () => Waypoint);

module.exports = 'Waypoint';
