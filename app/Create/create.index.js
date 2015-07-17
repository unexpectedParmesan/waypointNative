'use strict';
var React = require('react-native');
var _ = require('underscore');
var styles = require('./create.styles.js');
var {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  } = React;

class Create extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      waypoints: [[37.7837235, -122.4089778], [37.7832885,-122.4074516], [37.7832885,-122.4074516], [37.7955138,-122.3933047]],
      waypointInputCount: 2
    };
  }

  saveWaypoints(id){
    console.log(this.state);

    // this.state.waypoints.forEach(function(waypointArray, index){
      
    //   var data = {
    //     quest_id: id,
    //     index_in_quest: index,
    //     latitude: waypointArray[0],
    //     longitude: waypointArray[1],
    //     title: ,
    //     description: '',
    //   };

    //   fetch('https://waypointserver.herokuapp.com/quests/' + id + '/waypoints' , {
    //     method: 'POST',
    //     headers: {
    //      'Accept': 'application/json',
    //      'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data) 
    //   })
    //     .then((responseData) => {
    //       console.log(responseData);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .done();
    // });

  }

  // POST path data to server
  savePath(){
    console.log('in savePath!')
    console.log(this.refs.questTitle);

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

  renderWaypointInputs(){
    var results = [], remove;
    for (var i = 0; i < this.state.waypointInputCount; i++) {
      if (i > 1) {
        remove = <TouchableHighlight
          underlayColor={'#0d5ba9'}
          style={styles.removeWaypointButton}
          onPress={ () => {
            this.setState({
              waypointInputCount: this.state.waypointInputCount - 1
            }, () => {
              console.log('waypoint Count', this.state.waypointInputCount);
            });
          }}>
          <Text
          style={styles.removeWaypointText}>
            Remove this waypoint
        </Text>
        </TouchableHighlight>;
      }

      results.push(
        <View>
          <Text style={styles.label}>Waypoint {i + 1}</Text>
          <TextInput 
            style={styles.input}
            autoCapitalize="none" 
            autoCorrect={false}
            multiline={true} 
            placeholder={'Title'}
            returnKeyType="next"  />
          <TextInput 
            style={styles.inputLong}
            autoCapitalize="none" 
            autoCorrect={false}
            multiline={true} 
            placeholder={'Description'}
            returnKeyType="next"  />
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
          {remove}
        </View>
      )
    }
    return results;
  }

  render() {
    return (
      <ScrollView 
        onScroll={() => { console.log('onScroll!'); }}
        scrollEventThrottle={200}
        contentInset={{top: -50}}
        alwaysBounceVertical={true}
        style={styles.scroll}>
        <View style={styles.container}>
          <QuestTitle 
            ref={'questTitle'} />
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.inputLong}
            autoCapitalize="none" 
            autoCorrect={false}
            multiline={true} 
            returnKeyType="next"
            onChange={(event) => { 
              this.setState({
                description: event.nativeEvent.text,
              });
            }}
            onEndEditing={(event) => { 
              this.setState({
                description: event.nativeEvent.text,
              });
            }} />
            {this.renderWaypointI}
          <Text style={styles.label}>Waypoint 1</Text>
          <TextInput 
            style={styles.input}
            autoCapitalize="none" 
            autoCorrect={false}
            multiline={true} 
            placeholder={'Waypoint Title'}
            returnKeyType="next" 
            onChange={(event) => { 
              this.setState({
                waypoint1: {
                  title: event.nativeEvent.text
                },
              });
            }}
            onEndEditing={(event) => { 
              this.setState({
                waypoint1: {
                  title: event.nativeEvent.text
                },
              });
            }} />
          <TextInput 
            style={styles.inputLong}
            autoCapitalize="none" 
            autoCorrect={false}
            multiline={true} 
            placeholder={'Waypoint Description'}
            returnKeyType="next" 
            onChange={(event) => { 
              this.setState({
                waypoint1: {
                  description: event.nativeEvent.text
                },
              });
            }}
            onEndEditing={(event) => { 
              this.setState({
                waypoint1: {
                  description: event.nativeEvent.text
                },
              });
            }} />
          { this.renderWaypointInputs() }
          <TouchableHighlight
            underlayColor={'rgba(0,0,0,.0)'}
            style={styles.addWaypointButton}
            onPress={() => {
                console.log('button clicked')
                this.setState({
                  waypointInputCount: this.state.waypointInputCount + 1
                }, () => {
                  console.log('waypoints', this.state.waypointInputCount);
                });
            }} >
            <Text style={styles.addWaypointText}>
              Add Waypoint
            </Text>
          </TouchableHighlight>
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