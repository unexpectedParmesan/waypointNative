'use strict';

var React = require('react-native');
var Main = require('../Main/main.index.js');
var styles = require('./begin.styles.js');

var {
  AppRegistry,
  Navigator,
} = React;


class Begin extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.user,
    }
  }

  handleLogout() {
    this.setState({user: null});
    this.props.onLogout();
  }


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

}; // end of Begin


module.exports = Begin;
