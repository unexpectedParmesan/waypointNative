'use strict';

var React = require('react-native');
var styles = require('./profile.styles.js');

var Browse = require('../Browse/browse.index.js');

// var baseUrl = 'https://waypointserver.herokuapp.com';
var baseUrl: 'http://127.0.0.1:3000/'

var {
  Text,
  View,
  Image,
  TouchableHighlight
  } = React;

class Profile extends React.Component {

  constructor(props){
    super(props);
  } // end of constructor()

  // This works the same as it does in the browse view.
  // It uses the navigator component that was passed in as a prop.
  // After clicking on active or created quests, user can then navigate back to the profile page.
  // Reuses browse component from the nav bar.
  renderActiveQuests() {
    var url = this.props.url + 'users/' + this.props.user.userId + '/activeQuests';
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Active Quests',
      component: Browse,
      passProps: { ref: this.refs, 
                   user: this.props.user, 
                   url: url, type: 'active', 
                   baseUrl: this.props.url,
                   setCurrentQuest: this.props.setCurrentQuest,
                   setSelectedTab: this.props.setSelectedTab }
    });
  }

  renderCreatedQuests() {
    var url = this.props.url + 'users/' + this.props.user.userId + '/createdQuests';
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Created Quests',
      component: Browse,
      passProps: { ref: this.refs, 
                   user: this.props.user, 
                   url: url, type: 'created', 
                   baseUrl: this.props.url,
                   setCurrentQuest: this.props.setCurrentQuest,
                   setSelectedTab: this.props.setSelectedTab }
    });
  }


  // renders basic profile data (name, photo) as well as buttons for user-specific quests
  // (active quests and quests the user created).
  // Also allows user to log out from profile page by invoking the logout function passed down
  // in props from the Waypoint component.
  // If user logs out, she is taken back to Waypoint/login.
  render() {
   return (
    <View style={ styles.container } >
      <View style={ styles.headerContainer }>
        <Image
          style={styles.photo}
          source={{uri: this.props.user.photoUrl}}
          accessibilityLabel="Your Profile Photo" />
        <View style={styles.nameAndLogOutContainer}>
          <Text style={ styles.name }> { this.props.user.name } </Text>
          <TouchableHighlight
             style={ styles.logoutButton}
             onPress={ this.props.onLogout }
             underlayColor={'#eeeeee'}>
               <Text style={ styles.logoutButtonText }>
                 Log Out
               </Text>
            </TouchableHighlight>
        </View>
      </View>
      <View style={ styles.questsContainer } >
        <TouchableHighlight
          style={ styles.questButton }
          onPress={ this.renderActiveQuests.bind(this) }
          underlayColor={'#48B04A'}>
          <Text style={ styles.questButtonText } >
            View Active Quests
          </Text>
        </TouchableHighlight>
          <TouchableHighlight
          style={ styles.questButton}
          onPress={ this.renderCreatedQuests.bind(this) }
          underlayColor={'#48B04A'}>
          <Text style={ styles.questButtonText }>
            View Created Quests
          </Text>
        </TouchableHighlight>
      </View>
    </View>
   )
  } // end of render()

} // end of Profile class

module.exports = Profile;
