'use strict';
var React = require('react-native');
var Detail = require('./Detail/detail.index.js');
var styles = require('./browse.styles.js');
var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  } = React;

class Browse extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
      loading: true, // loading animation property
    };
  } // end of constructor()

  // - After the scene is mounted, fetch relevant quests.
  // - Update this.state.dataSource API responseData
  // - Stop loading animation on success
  componentDidMount() {
    console.log('fetching this url: ', this.props.url);
    fetch(this.props.url) // assumes parent has passed in a quest url
      .then((response) => {
        var result = response.json();
        console.log(result);
        return result;
      })
      .then((responseData) => {
        console.log('response data: ', responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      })
       .done();

  } // end of componentWillMount()

  // Renders loading view while data is fetched from API
  renderLoading(){
    return (
      <ActivityIndicatorIOS
        color='#ED4519'
        animating={this.state.loading}
        style={[styles.centering, {height: 80}]}
        size="large" />
    );
  }

  // Renders the list of quests retrieved from the API
  renderList(){
    return (
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderQuest.bind(this)} />
    )
  }

  // Render each quest in the list
  renderQuest(quest) {
    // If the quest is longer than 100 characters, show a portion of description and add ellipses
    var description = '';
    if (quest.description.length >= 100) {
      description = quest.description.substring(0, 105) + '...';
    } else {
      description = quest.description;
    }

    // The onPress event will call the renderDetailView() function to render the Detail View for the quest
    return (
      <TouchableHighlight style={styles.item}
        onPress={this.renderDetailView.bind(this, quest)}
        underlayColor={'#FFFFFF'}>
        <View>
          <Text style={styles.title}>{quest.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.details}>
            {quest.waypoints.length} stops - {quest.length} - {quest.estimated_time}</Text>
          </View>
          <View>
            <Text style={styles.description}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  } // end of renderQuest()

  // Renders the quest's Detail View
  renderDetailView(quest) {
    // render the scene with the navigator object to allow
    // the user to navigate back to the main ListView from the Detail View
    this.props.navigator.push({
      backButtonTitle: ' ',
      title: 'Quest Details',
      component: Detail,
      passProps: { details: quest }
    }) // end of props.navigator.push()
  } // end of renderDetailView()

  render() {
    if (this.state.loading) {
      console.log("state is loading")
      return this.renderLoading();
    } else {
      console.log('state is loaded')
      return this.renderList();
    }
  } // end of render()

} // end of Browse class

module.exports = Browse;
