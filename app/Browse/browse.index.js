var React = require('react-native');
var styles = require('./browse.styles.js');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

class Browse extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  }

  componentDidMount() {
    var paths = [
        {path: {title: 'Seaside Bike Ride', creator: "DK", description: 'Please bike ride along oceanside in SF'}},
        {path: {title: 'Pub Crawl', creator: "DK", description: 'Hope you\'re thirsty'}},
        {path: {title: 'SF Tour', creator: "DK", description: 'Tour of San Francisco. Includes audio commentary.'}},
    ];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(paths)
    });
  }

  render() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPath.bind(this)}
          style={styles.listView}/>
    )
  }

  renderPath(path) {
    console.log(path);
    return (
      <TouchableHighlight
        activeOpacity={2}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>{path.path.title}</Text>
          <Text>{path.path.creator}</Text>
          <Text>{path.path.description}</Text>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = Browse;