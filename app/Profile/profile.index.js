'use strict';
var React = require('react-native');
var styles = require('./profile.styles.js');

var Browse = require('../Browse/browse.index.js');

var baseUrl = 'https://waypointserver.herokuapp.com';

var {
  Text,
  View,
  Image,
  TouchableHighlight,
  NavigatorIOS
  } = React;

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.user
    };
  } // end of constructor()


  renderActiveQuests() {
    console.log('rendering active quests');
    console.log('props: ', this.props);
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Active Quests',
      component: Browse,
      passProps: { ref: this.refs, user: this.props.user, url: baseUrl + '/quests' }
    });
  }

  renderCreatedQuests() {
    console.log('rendering created quests');
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Created Quests',
      component: Browse,
      passProps: { ref: this.refs, user: this.props.user, url: baseUrl + '/quests' }
    });
  }

  onLogout() {
    console.log('logging out');
    this.props.onLogout();
  }

  render() {
   return (
    <View style={ styles.container } >
      <View style={ styles.photoContainer }>
        <Image
          style={styles.photo}
          source={{uri: this.state.user.photoUrl}}
          accessibilityLabel="Your Profile Photo"
        />
        <Text style={ styles.name }> { this.state.user.name } </Text>
      </View>
      <View style={ styles.questsContainer } >
        <TouchableHighlight
          style={ styles.questButton }
          onPress={this.renderActiveQuests.bind(this)}
          underlayColor={'#2f8d58'}>
          <Text style={ styles.questButtonText } >
            Active Quests
          </Text>
        </TouchableHighlight>
          <TouchableHighlight
          style={ styles.questButton}
          onPress={this.renderCreatedQuests.bind(this)}
          underlayColor={'#2f8d58'}>
          <Text style={ styles.questButtonText }>
            Created Quests
          </Text>
        </TouchableHighlight>
      </View>
      <View style={ styles.logoutButtonContainer }>
          <TouchableHighlight
           style={ styles.logoutButton}
           onPress={this.onLogout.bind(this)}
           underlayColor={'#2f8d58'}>
           <Text style={ styles.logoutButtonText }>
             Log Out
           </Text>
        </TouchableHighlight>
      </View>
    </View>
   )
  } // end of render()

} // end of Profile class

module.exports = Profile;