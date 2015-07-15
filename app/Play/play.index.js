'use strict';

var React = require('react-native');
var styles = require('./play.styles.js');

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  } = React;

var Detail = require('./Detail/detail.index.js');

class Play extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  } // end of constructor()

  // Before the scene is mounted, fetch all quests from /quests API endpoint
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

  // In ListView render each quest using renderRow()
  render() {
    return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderQuest.bind(this)}/>
    )
  } // end of render()

  // Render each quest in the list
  renderQuest(quest) {
    // If the quest is longer than 100 characters, show a portion of description and add ellipses
    var description = '';
    if (quest.description.length >= 100) {
      description = quest.description.substring(0, 105) + '...';
    } else {
      description = quest.description;
    }

    // The onPress event will call the renderDetailView() function to render the Detail View for the quest
    return (
      <TouchableHighlight style={styles.item}
        onPress={this.renderDetailView.bind(this, quest)}
        underlayColor={'#FFFFFF'}>
        <View>
          <Text style={styles.title}>{quest.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
            {quest.waypoints.length} stops - {quest.length} - {quest.estimated_time}</Text>
          </View>
          <View>
            <Text style={styles.description}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  } // end of renderQuest()

  // Renders the quest's Detail View
  renderDetailView(quest) {
    // "push a new view"
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Quest Details',
      component: Detail,
      passProps: { details: quest }
    }) // end of props.navigator.push()
  } // end of renderDetailView()
} // end of Play class

module.exports = Play;
