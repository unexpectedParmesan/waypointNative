'use strict';

var React = require('react-native');
var Main = require('../Main/main.index.js');
var styles = require('./begin.styles.js');

var {
  AppRegistry,
  Navigator,
  View,
} = React;


class Begin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.user,
      onLogout: function() {
        this.handleLogout();
      }
    }
  }

  handleLogout() {
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
