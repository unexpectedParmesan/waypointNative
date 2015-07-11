var React = require('react-native');
// var Icon = require('react-native-vector-icons/FontAwesome');
var Browse = require('../Browse/browse.index.js');
var Map = require('../Map/map.index.js');
var Create = require('../Create/create.index.js');
var styles = require('./main.styles.js')

var {
  TabBarIOS,
  NavigatorIOS,
} = React;

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
        selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          style={styles.description}
          selected={this.state.selectedTab === 'browse'}
          title="Browse"
          onPress={ ()=> {
            this.setState({
              selectedTab: 'browse'
            });
          }}>
          {this.renderBrowseView()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'map'}
          title="Map"
          onPress={ ()=> {
            this.setState({
              selectedTab: 'map'
            });
          }}>
          {this.renderMapView()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'create'}
          title="Create"
          onPress={ ()=> {
            this.setState({
              selectedTab: 'create'
            });
          }}>
          {this.renderCreateView()}
          </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

  renderBrowseView(){
    return (
      <NavigatorIOS 
        initialRoute={{
          title: 'Browse Paths',
          component: Browse
        }}/>
    )
  }

  renderMapView(){
    return (
      <NavigatorIOS 
        initialRoute={{
          title: 'Map View',
          component: Map
        }}/>
    )
  }

  renderCreateView(){
    return (
      <NavigatorIOS 
        initialRoute={{
          title: 'Create Path',
          component: Create
        }}/>
    )
  }

};

module.exports = Main;
