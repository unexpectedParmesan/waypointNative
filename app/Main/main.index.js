var React = require('react-native');
var styles = require('./main.styles.js')

var {
  TabBarIOS,
  NavigatorIOS,
} = React;

// Components
var Browse = require('../Browse/browse.index.js');
var Map = require('../Map/map.index.js');
var Create = require('../Create/create.index.js');

class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedTab: 'browse'
    };
  }

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
          selected={this.state.selectedTab === 'map'}
          title="Map"
          onPress={ ()=> {
            if (this.state.selectedTab === 'map') {
              this.refs.MapRef.popToTop();
            } else {
              this.setState({
                selectedTab: 'map'
              });
            }
          }}>
          {this.renderMapView()}
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
  }

  renderBrowseView(){
    return (
      <NavigatorIOS 
        style={styles.wrapper}
        ref="BrowseRef"
        initialRoute={{
          title: 'Browse Paths',
          backButtonTitle: ' ',
          component: Browse,
        }}/>
    )
  }

  renderMapView(){
    return (
      <NavigatorIOS 
        style={styles.wrapper}
        ref="MapRef"
        initialRoute={{
        title: 'Map View',
        backButtonTitle: ' ',
        component: Map,
        }}/>
    )
  }

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
  }

};

module.exports = Main;
