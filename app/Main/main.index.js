'use strict';

var React = require('react-native');
var styles = require('./main.styles.js')
var FBLoginManager = require('NativeModules').FBLoginManager

var {
  TabBarIOS,
  NavigatorIOS,
  View,
} = React;

var Browse = require('../Browse/browse.index.js');
var Map = require('../Map/map.index.js');
var Create = require('../Create/create.index.js');
var Profile = require('../Profile/profile.index.js');

class Main extends React.Component {
  // Default view is 'browse'
  constructor (props) {
    console.log('user passed into main: ', props.user);
    super(props);
    this.state = {
      selectedTab: 'browse',
      user: props.user,
      handleLogout: props.handleLogout,
    };
  } // end of constructor()

  handleLogout () {
    this.props.onLogout();
  }

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

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'profile'}
          title="Profile"
          onPress={ ()=> {
            if (this.state.selectedTab === 'profile') {
              this.refs.ProfileRef.popToTop();
            } else {
              this.setState({
                selectedTab: 'profile'
              });
            }
          }}>
          {this.renderProfileView()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          selected={this.state.selectedTab === 'logout'}
          title="Logout"
          onPress={ ()=> {
            this.setState({
              selectedTab: 'logout'
            });
            this.handleLogout();
          }}>
          {this.renderLogoutView()}
        </TabBarIOS.Item>

      </TabBarIOS>
    )
  } // end of render()

  renderLogoutView() {
    return (
      <View>
      </View>
    )
  }

  // renders the Browse Quests list
  renderBrowseView(){
    return (
      <NavigatorIOS
        style={styles.wrapper}
        ref="BrowseRef"
        initialRoute={{
          title: 'Browse Quests',
          backButtonTitle: ' ',
          component: Browse,
          passProps: { ref: this.refs, user: this.props.user }
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
          title: 'Create Quest',
          backButtonTitle: ' ',
          component: Create,
          passProps: { test: "HEYA! I'M THE CREATE VIEW!! "}
        }}/>
    )
  } // end of renderCreateView()

  // renders the Profile view
  renderProfileView(){
    return (
      <NavigatorIOS
        style={styles.wrapper}
        ref="ProfileRef"
        initialRoute={{
          title: 'Profile',
          backButtonTitle: ' ',
          component: Profile,
          passProps: { user: this.props.user, onLogout: this.props.onLogout}
        }}/>
    )
  } // end of renderCreateView()

}; // end of Main class

module.exports = Main;
