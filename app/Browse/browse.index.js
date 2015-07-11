var React = require('react-native');
var styles = require('./browse.styles.js')
var {
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  SegmentedControlIOS,
  AlertIOS,
  AppStateIOS
  } = React;

class Browse extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Browse View</Text>
      </View>
    )
  }
}

module.exports = Browse;