'use strict';
var React = require('react-native');
var styles = require('./profile.styles.js');

var {
  Text,
  View,
  Image,
  } = React;

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.user
    };
  } // end of constructor()



  render() {
   return (
    <View style={styles.container} >
      <Text> { this.state.user.name } </Text>
      <Image
        style={styles.photo}
        source={{uri: this.state.user.photoUrl}}
        accessibilityLabel="Your Profile Photo"
      />
    </View>
   )
  } // end of render()

} // end of Profile class

module.exports = Profile;