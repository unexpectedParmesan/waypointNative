'use strict';

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

  // Before the scene is mounted, fetch all paths from /paths API endpoint
  // Update this.state.dataSource using fetched data
  componentWillMount() {
    fetch('https://waypointserver.herokuapp.com/paths')
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

  // In ListView render each path using renderRow()
  render() {
    return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderPath.bind(this)}/>
    )
  } // end of render()

  // Render each path in the list
  renderPath(path) {
    // If the path is longer than 100 characters, show a portion of description and add ellipses
    var description = '';
    if (path.description.length >= 100) {
      description = path.description.substring(0, 105) + '...';
    } else {
      description = path.description;
    }

    // The onPress event will call the renderDetailView() function to render the Detail View for the path
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

  // Renders the path's Detail View
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