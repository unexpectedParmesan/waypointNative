'use strict';

var React = require('react-native');
var styles = require('./main.styles.js')

var {
  TabBarIOS,
  NavigatorIOS,
} = React;

var Browse = require('../Browse/browse.index.js');
var Map = require('../Map/map.index.js');
var Create = require('../Create/create.index.js');

class Main extends React.Component {
  // Default view is 'browse'
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'browse'
    };
  } // end of constructor()

  // - When a tab is clicked on the TabBar, the tab calls the corresponding function which will render that scene.
  render () {
    return (
      <TabBarIOS 
        style={styles.tabBar}
        selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          style={styles.description}
          selected={this.state.selectedTab === 'browse'}
          title="Browse"
          onPress={ ()=> {
            if (this.state.selectedTab === 'browse'){
              this.refs.BrowseRef.popToTop();
            } else {
              this.setState({
                selectedTab: 'browse'
              });
            }
          }}>
          {this.renderBrowseView()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'create'}
          title="Create"
          onPress={ ()=> {
            if (this.state.selectedTab === 'create') {
              this.refs.CreateRef.popToTop();
            } else {
              this.setState({
                selectedTab: 'create'
              });
            }
          }}>
          {this.renderCreateView()}
          </TabBarIOS.Item>
      </TabBarIOS>
    )
  } // end of render()

  // renders the Browse Paths list
  renderBrowseView(){
    return (
      <NavigatorIOS 
        style={styles.wrapper}
        ref="BrowseRef"
        initialRoute={{
          title: 'Browse Paths',
          backButtonTitle: ' ',
          component: Browse,
          passProps: { ref: this.refs }
        }}/>
    )
  } // end of renderBrowseView()

  // renders the Create view
  renderCreateView(){
    return (
      <NavigatorIOS 
        style={styles.wrapper}
        ref="CreateRef"
        initialRoute={{
          title: 'Create Path',
          backButtonTitle: ' ',
          component: Create,
          passProps: { test: "HEYA! I'M THE CREATE VIEW!! "}
        }}/>
    )
  } // end of renderCreateView()

}; // end of Main class

module.exports = Main;