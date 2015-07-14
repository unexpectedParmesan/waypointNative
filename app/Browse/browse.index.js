var React = require('react-native');
var styles = require('./browse.styles.js');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

var Detail = require('./Detail/detail.index.js');

class Browse extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  } // end of constructor()

  componentWillMount() {
    fetch('http://localhost:3000/paths')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData)
        });
      })
      .catch((error) => {
        console.log(error)
      })
       .done();
  } // end of componentWillMount()

  render() {
    return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderPath.bind(this)}/>
    )
  } // end of render()

  renderPath(path) {
    var description = '';
    if (path.description.length >= 100) {
      description = path.description.substring(0, 105) + '...';
    } else {
      description = path.description;
    }

    return (
      <TouchableHighlight style={styles.item}
        onPress={this.renderDetailView.bind(this, path)}
        underlayColor={'#FFFFFF'}>
        <View>
          <Text style={styles.title}>{path.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
            {path.waypoints.length} stops - {path.length} - {path.estimated_time}</Text>
          </View>
          <View>  
            <Text style={styles.description}> 
              {description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    ) 
  } // end of renderPath()

  renderDetailView(path) {
    // "push a new view"
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Path Details',
      component: Detail,
      passProps: { details: path }
    }) // end of props.navigator.push()
  } // end of renderDetailView()
} // end of Browse class

module.exports = Browse;