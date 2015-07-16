'use strict';
var React = require('react-native');
var styles = require('./create.styles.js');
var Stop = require('./Stop/stop.index.js');

var {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  ListView,
  } = React;

class Create extends React.Component {
  constructor(props){
    super(props);
 
    this.state = {
      title: '',
      description: '',
      waypoints: [[37.7837235, -122.4089778], [37.7832885,-122.4074516], [37.7832885,-122.4074516], [37.7955138,-122.3933047]]
    };

  }

  updateTitle(text){
    console.log(text);
    this.setState({
      title: text,
    }, () => {
      console.log(this.state);
    });
  }

  updateDescription(text){
    console.log(text);
    this.setState({
      description: text,
    }, () => {
      console.log(this.state);
    });
  }

  // quest_id: req.params.questId,
  // index_in_quest: req.body.indexInQuest,
  // latitude: req.body.latitude,
  // longitude: req.body.longitude,
  // title: req.body.title,
  // description: req.body.description,

  saveWaypoints(id){

    this.state.waypoints.forEach(function(waypointArray, index){
      var data = {
        quest_id: id,
        index_in_quest: index,
        latitude: waypointArray[0],
        longitude: waypointArray[1],
        title: '',
        description: '',
      };

      fetch('https://waypointserver.herokuapp.com/quests/' + id + '/waypoints' , {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      })
        .then((responseData) => {
          console.log(responseData);
        })
        .catch((error) => {
          console.log(error);
        })
        .done();
    });

  }

  // POST path data to server
  savePath(){
    console.log('saving path');
    console.log(this.state);
    var data = {
      title: this.state.title,
      description: this.state.description,
      length: '4 miles',
      estimated_time: '3 hours'
    };

    fetch('https://waypointserver.herokuapp.com/quests', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((responseData) => {
        
        responseData = JSON.parse(responseData._bodyInit)
        this.saveWaypoints(responseData.id);
      })
      .catch((error) => {
        console.log(error)
      })
       .done();
  }// end of savePath()

  render() {
    return (
      <ScrollView 
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        contentInset={{top: -50}}
        alwaysBounceVertical={true}
        style={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
            style={styles.input}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false} 
            returnKeyType="next"
            multiline={true} 
            onChange={(event) => { 
              this.updateTitle(event.nativeEvent.text);
            }}
            onEndEditing={(event) => { 
              this.updateTitle(event.nativeEvent.text);
            }} />
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.inputLong}
            autoCapitalize="none" 
            autoCorrect={false}
            multiline={true} 
            returnKeyType="next"
            onChange={(event) => { 
              this.updateDescription(event.nativeEvent.text);
            }}
            onEndEditing={(event) => { 
              this.updateDescription(event.nativeEvent.text);
            }} />
          <Text style={styles.label}>Waypoint 1</Text>
          <View style={styles.waypointGroup}>
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Latitude'}
              returnKeyType="next"  />
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Longitude'}
              returnKeyType="next"  />
          </View>
          <Text style={styles.label}>Waypoint 2</Text>
          <View style={styles.waypointGroup}>
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Latitude'}
              returnKeyType="next"  />
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Longitude'}
              returnKeyType="next"  />
          </View>
          <Text style={styles.label}>Waypoint 3</Text>
          <View style={styles.waypointGroup}>
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Latitude'}
              returnKeyType="next"  />
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Longitude'}
              returnKeyType="next"  />
          </View>
          <Text style={styles.label}>Waypoint 4</Text>
          <View style={styles.waypointGroup}>
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Latitude'}
              returnKeyType="next"  />
            <TextInput 
              style={styles.waypointInput}
              autoCapitalize="none" 
              autoCorrect={false}
              multiline={true} 
              placeholder={'Longitude'}
              returnKeyType="done"  />
          </View>
          <TouchableHighlight 
            underlayColor={'#0d5ba9'}
            style={styles.savePathButton}
            onPress={this.savePath.bind(this, this.state)} >
            <Text style={styles.savePathText}>
              Save Quest
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  } // end of render()

} // end of Create class

module.exports = Create;