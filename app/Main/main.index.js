'use strict';

var React = require('react-native');
var styles = require('./main.styles.js')

var {
  TabBarIOS,
  NavigatorIOS,
} = React;

var Play = require('../Play/play.index.js');
var Map = require('../Map/map.index.js');
var Create = require('../Create/create.index.js');

class Main extends React.Component {
  // Default view is 'play'
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'create'
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
          selected={this.state.selectedTab === 'play'}
          title="Play"
          onPress={ ()=> {
            if (this.state.selectedTab === 'play'){
              this.refs.PlayRef.popToTop();
            } else {
              this.setState({
                selectedTab: 'play'
              });
            }
          }}>
          {this.renderPlayView()}
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

  // renders the Play Quests list
  renderPlayView(){
    return (
      <NavigatorIOS
        style={styles.wrapper}
        ref="PlayRef"
        initialRoute={{
          title: 'Play Quests',
          backButtonTitle: ' ',
          component: Play,
          passProps: { ref: this.refs }
        }}/>
    )
  } // end of renderPlayView()

  // renders the Create view
  renderCreateView(){
    return (
      <NavigatorIOS
        style={styles.wrapper}
        ref="CreateRef"
        initialRoute={{
          title: 'Create Quest',
          backButtonTitle: ' ',
          component: Create,
          passProps: { test: "HEYA! I'M THE CREATE VIEW!! "}
        }}/>
    )
  } // end of renderCreateView()

}; // end of Main class

module.exports = Main;
