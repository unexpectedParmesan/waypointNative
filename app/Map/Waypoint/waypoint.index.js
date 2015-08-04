'use strict';

var React = require('react-native');
var styles = require('./waypoint.styles.js');

var {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  WebView,
  Image
} = React;

// If we have gotten this far, it means the user is logged in.
// This component just sets off the logic that renders the child views.
class Waypoint extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    var mediaView;
    if (!this.props.url) {
      mediaView = <View />;
    } else {
      mediaView = ( <TouchableHighlight
            onPress={() => {
               this.props.navigator.push(
                {
                  title: this.props.title,
                  backButtonTitle: ' ',
                  component: WebView,
                  passProps: {
                    url: this.props.url
                  }
                }
               );
            }}>
            <Text style={styles.description}>Media link: <Text style={styles.url}>{this.props.url}</Text></Text>
          </TouchableHighlight> );
    }

    return (
      <View>
        <ScrollView style={styles.scrollView} centerContent={false}>
          <Text style={styles.description}>{this.props.description}</Text>
          {mediaView}
        </ScrollView>
        {this.props.button}
      </View>
    )
  } // end of render()

}; // end of Begin


module.exports = Waypoint;
