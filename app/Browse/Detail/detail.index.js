'use strict';

var React = require('react-native');
var styles = require('./detail.styles.js');

var {
  View,
  Text,
  MapView,
  TouchableHighlight,
  Navigator,
  ScrollView,
} = React;

var Map = require('../../Map/map.index.js');

class Detail extends React.Component {
  // When 'Start Quest' button is pressed, renderQuest() is called
  render () {
    return (
      <ScrollView
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        contentInset={{top: -50}}
        alwaysBounceVertical={true}
        style={styles.scroll}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>{this.props.details.title}</Text>
            <Text style={styles.creator}>
              Created by {this.props.details.creator}
            </Text>
            <MapView
               style={styles.map}
               region={{
                 latitude:  37.783872,
                 latitudeDelta: 0.001,
                 longitude: -122.408972,
                 longitudeDelta: 0.001,
               }}
               showsUserLocation={true}/>
            <View style={styles.detailsContainer}>
              <Text style={styles.details}>
                {this.props.details.numWaypoints} stops - {this.props.details.length} - {this.props.details.estimated_time}
              </Text>
            </View>
              <Text style={styles.description}>{this.props.details.description}</Text>
            </View>
            <TouchableHighlight
              onPress={this.renderQuest.bind(this, this.props)}
              underlayColor={'#2f8d58'}
              style={styles.startQuestButton}>
              <Text style={styles.buttonText}>
                { this.props.details.current_waypoint_index || this.props.type === 'active' ? 'Resume Quest' : 'Start Quest' }
              </Text>
            </TouchableHighlight>
            { this.props.type === 'browse' ? <View></View> : this._renderDeleteButton() }
        </View>
      </ScrollView>
    )
  } // end of render()

  _getQuestUrl() {
    return this.props.baseUrl + 'users/' + this.props.user.userId + '/activeQuests/' + this.props.details.id;
  }

  _deleteQuest() {
    console.log('deleting quest!');
    var url = this.props.type === 'active' ? this._getQuestUrl() : this.props.baseUrl + 'quests/' + this.props.details.id; // fix this
    fetch(url, {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' }
    })
     .then( (response) => {
       console.log('successfully deleted from the database! ', response);
       this.props.callback();
       this.props.navigator.pop();
     })
     .catch( (error) => {
       console.warn('There was an error deleting the quest: ', error);
     })
  }

  _renderDeleteButton() {
    return (
      <TouchableHighlight
        onPress={this._deleteQuest.bind(this)}
        underlayColor={'#2f8d58'}
        style={styles.deleteQuestButton}>
        <Text style={styles.buttonText}>
          { this.props.type === 'active' ? 'Quit' : 'Delete' }
        </Text>
      </TouchableHighlight>
    )
  }

  _addActiveQuest() {
   var url = this._getQuestUrl();
   fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
   })
    .then((response) => {
     var quest = this.props.details;
     quest.current_waypoint_index = JSON.parse(response._bodyText).current_waypoint_index;
     this.props.setCurrentQuest(quest);
     this.props.setSelectedTab('quest');
    })
   .catch((error) => {
     console.warn(error);
   });
  }

  // Renders the quest on the Map component
  // Passes the quest's details to the Map component
  renderQuest (props) {

    if (this.props.type === 'browse' || this.props.type === 'created') {
      this._addActiveQuest();
    } else {
      this.props.setCurrentQuest(this.props.details);
      this.props.setSelectedTab('quest');
    }

    this.props.navigator.pop();
    this.props.navigator.push({
      title: this.props.details.title,
      component: Map,
      passProps: {
        numWaypoints: this.props.details.waypoints.length,
        quest: this.props.details,
        type: this.props.type,
        user: this.props.user,
        currentIndex: this.props.details.current_waypoint_index || 0,
        url: this.props.baseUrl
      }
    }) // end of props.navigator.push()
  } // end of renderQuest()
}; // end of Detail class

    // ATTEMPTING TO SWITCH TABS TO CURRENT QUEST
    // I THINK WE MIGHT NEED TO USE NAVIGATOR

    // var Main = require('../../Main/main.index.js');
    // console.log('$$$$$$$ passing props to main and selecting the quest tab');
    // return (
    //   <Main
    //     currentQuest={this.props.details}
    //     selectedTab='quest'
    //   />
    // )

module.exports = Detail;
