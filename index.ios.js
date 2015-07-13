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
  Navigator,
  MapView,
  AppStateIOS,
} = React;

// With subclass definition syntax we extend Component instead of calling createClass
class Waypoint extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <Navigator
        style={styles.wrapper}
        initialRoute={{
          title: 'Browse Paths',
          component: Main
        }}
        renderScene={(route, navigator) =>
          <Main
            name={route.name}
            navigator={navigator}/>
        }/>
    )
  }
}

AppRegistry.registerComponent('Waypoint', () => Waypoint);

module.exports = 'Waypoint';
