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

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.783872,
        latitudeDelta: 0.001,
        longitude: -122.408972,
        longitudeDelta: 0.001
      },
    };
  } // end of constructor()

  _setRegion(currentPosition) {
    var maxLat = currentPosition.coords.latitude;
    var minLat = maxLat;
    var maxLong = currentPosition.coords.longitude;
    var minLong = maxLong;
    var waypoints = this.props.details.waypoints;
    for (var i = 0; i < waypoints.length; i++) {
      var waypoint = waypoints[i];
      if (waypoint.latitude > maxLat) {
        maxLat = waypoint.latitude;
      }
      if (waypoint.latitude < minLat) {
        minLat = waypoint.latitude;
      }
      if (waypoint.longitude > maxLong) {
        maxLong = waypoint.longitude;
      }
      if (waypoint.longitude < minLong) {
        minLong = waypoint.longitude;
      }
    }
    var latDelta = Math.max(2 *(maxLat - minLat), 0.001);
    var longDelta = Math.max(2 * (maxLong - minLong), 0.001);
    var latCenter = minLat + ((maxLat - minLat) / 2);
    var longCenter = minLong + ((maxLong - minLong) / 2);

    var newRegion = {
      latitude: latCenter,
      latitudeDelta: latDelta,
      longitude: longCenter,
      longitudeDelta: longDelta
    };
    this.setState({ region: newRegion }, () => {
      console.log('new state: ', this.state.region);
    })
  }

  componentDidMount() {
    var context = this;
    navigator.geolocation.getCurrentPosition(
      (position) => { // success callback: sets initial position and initializes first waypoint
        context._setRegion(position);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

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
               region={this.state.region}
               annotations={this.props.details.waypoints} />
            <View style={styles.detailsContainer}>
              <Text style={styles.details}>
                {this.props.details.waypoints.length} stops { this.props.details.estimated_time ? '- ' + this.props.details.estimated_time : '' }
              </Text>
            </View>
              <Text style={styles.description}>{this.props.details.description}</Text>
            </View>
            <TouchableHighlight
              onPress={this.renderQuest.bind(this, this.props)}
              underlayColor={'#48B04A'}
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
        underlayColor={'#D32E2E'}
        style={styles.deleteQuestButton}>
        <Text style={styles.buttonText}>
          { this.props.type === 'active' ? 'Stop Quest' : 'Delete' }
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
  } // end of renderQuest()
}; // end of Detail class


module.exports = Detail;
