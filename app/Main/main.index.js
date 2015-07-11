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
          <Browse />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'map'}
          title="Map"
          onPress={ ()=> {
            this.setState({
              selectedTab: 'map'
            });
          }}>
          <Map />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'create'}
          title="Create"
          onPress={ ()=> {
            this.setState({
              selectedTab: 'create'
            });
          }}>
          <Create />
          </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

};

module.exports = Main;
