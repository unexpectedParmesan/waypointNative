'use strict';

var React = require('react-native');
var styles = require('./message.styles.js');

var {
  Text,
  View,
  } = React;

class Message extends React.Component {

  constructor(props){
    super(props);
  } // end of constructor()

  render() {
   return (
    <View style={ styles.container } >
      <Text style={ styles.messageText } >
       { this.props.message } 
      </Text>
    </View>
   )
  } // end of render()

} // end of Message class

module.exports = Message;

