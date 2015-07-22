'use strict';

var React = require('react-native');
var Main = require('../Main/main.index.js');
var styles = require('./begin.styles.js');

var {
  AppRegistry,
  Navigator,
} = React;

// If we have gotten this far, it means the user is logged in.
// This component just sets off the logic that renders the child views.
class Begin extends React.Component {

  constructor(props){
    super(props);
  }

  // - Renders a Navigator to render the main app scene
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
          <Main {...this.props} // passes user data and logout function through to child views
            name={route.name}
            selectedTab="browse"
            navigator={navigator}/>
        }/>
    )
  } // end of render()

}; // end of Begin


module.exports = Begin;
