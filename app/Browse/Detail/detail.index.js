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
        </View>
      </ScrollView>
    )
  } // end of render()

  _addActiveQuest() {
   var url = this.props.baseUrl + 'users/' + this.props.user.userId + '/activeQuests/' + this.props.details.id;
   fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
   })
    .then((response) => {
     console.log('adding active quest or acknowledging its existence: ', response);
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
    }

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

module.exports = Detail;
