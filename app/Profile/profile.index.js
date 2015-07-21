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
    console.log('props passed into profile: ', props)
  } // end of constructor()

  // This works the same as it does in the browse view.
  // It uses the navigator component that was passed in as a prop.
  // After clicking on active or created quests, user can then navigate back to the profile page.
  // Reuses browse component from the nav bar.
  renderActiveQuests() {
    var url = this.props.url + 'users/' + this.props.user.userId + '/activeQuests';
    console.log('making this query: ', url);
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Active Quests',
      component: Browse,
      passProps: { ref: this.refs, user: this.props.user, url: url }
    });
  }

  renderCreatedQuests() {
    var url = this.props.url + 'users/' + this.props.user.userId + '/createdQuests';
    console.log('making this query: ', url);
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Created Quests',
      component: Browse,
      passProps: { ref: this.refs, user: this.props.user, url: url }
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
      <View style={ styles.photoContainer }>
        <Image
          style={styles.photo}
          source={{uri: this.props.user.photoUrl}}
          accessibilityLabel="Your Profile Photo"
        />
        <Text style={ styles.name }> { this.props.user.name } </Text>
      </View>
      <View style={ styles.questsContainer } >
        <TouchableHighlight
          style={ styles.questButton }
          onPress={ this.renderActiveQuests.bind(this) }
          underlayColor={'#2f8d58'}>
          <Text style={ styles.questButtonText } >
            Active Quests
          </Text>
        </TouchableHighlight>
          <TouchableHighlight
          style={ styles.questButton}
          onPress={ this.renderCreatedQuests.bind(this) }
          underlayColor={'#2f8d58'}>
          <Text style={ styles.questButtonText }>
            Created Quests
          </Text>
        </TouchableHighlight>
      </View>
      <View style={ styles.logoutButtonContainer }>
          <TouchableHighlight
           style={ styles.logoutButton}
           onPress={ this.props.onLogout }
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
