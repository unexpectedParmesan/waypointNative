'use strict';
var React = require('react-native');
var styles = require('./questTitle.styles.js');
var {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  } = React;

class QuestTitle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: ''
    };
  }

  render(){
    return(
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput 
          style={styles.input}
          autoFocus={true}
          autoCapitalize="none"
          autoCorrect={false} 
          returnKeyType="next"
          multiline={true} 
          onChange={(event) => {
            this.setState({
              title: event.nativeEvent.text,
            }, () => {
              console.log(this.state.title);
            });
          }}
          onEndEditing={(event) => { 
            this.setState({
              title: event.nativeEvent.text,
            }, () => {
              console.log(this.state.title);
            });
          }} />
      </View>
    )
  }
}

module.exports = QuestTitle;