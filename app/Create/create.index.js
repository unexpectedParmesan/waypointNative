'use strict';
var React = require('react-native');
var styles = require('./create.styles.js')
var {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  } = React;

class Create extends React.Component {
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
            style={styles.textInputShort}
            autoCapitalize="none"
            autoCorrect={false} 
            onChange={this.updateText.bind(this, 'title')}/>
          <Text style={styles.label}>Quest length (miles)</Text>
          <TextInput 
            style={styles.textInputShort}
            autoCapitalize="none"
            autoCorrect={false} 
            onChange={this.updateText.bind(this, 'length')}/>
          <Text style={styles.label}>Time to complete</Text>
          <TextInput 
            style={styles.textInputShort}
            autoCapitalize="none"
            autoCorrect={false} 
            onChange={this.updateText.bind(this, 'estimated_time')} />
          <Text style={styles.label}>Description</Text>
          <TextInput 
            style={styles.textInputLong}
            autoCapitalize="none" 
            autoCorrect={false}
            multiline={true} 
            onChange={this.updateText.bind(this, 'description')} />
          <TouchableHighlight 
            underlayColor={'#2f8d58'}
            style={styles.addWaypointButton}>
            <Text style={styles.addWaypointText}>
              Add waypoint
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  } // end of render()

  updateText(field) {
    console.log(field);
  }
} // end of Create class

module.exports = Create;