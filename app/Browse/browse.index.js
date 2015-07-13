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
        {path: {title: 'Seaside Bike Ride', creator: "DK", description: 'Pleasan bike ride along ocean beach in SF. Pray for sun or else it might not be so pleasant!'}},
        {path: {title: 'Pub Crawl', creator: "DK", description: 'Hope you\'re thirsty'}},
        {path: {title: 'SF Tour', creator: "DK", description: 'Tour of San Francisco. Includes audio commentary, pleasant and gross smells, lovely and ugly views, and much, much, more.'}},
    ];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(paths)
    });
  }

  render() {
    return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderPath.bind(this)}/>
    )
  }

  renderPath(path) {
    console.log(path);
    return (
      <TouchableHighlight style={styles.item}
        underlayColor={'#FFFFFF'}>
        <View>
          <Text style={styles.title}>{path.path.title}</Text>
          <Text style={styles.creator}>Created by {path.path.creator}</Text>
          <Text style={styles.description}>{path.path.description}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = Browse;