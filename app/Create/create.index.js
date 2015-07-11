var React = require('react-native');
var styles = require('./create.styles.js')
var {
  Text,
  View,
  } = React;

class Create extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Create View</Text>
      </View>
    )
  }
}

module.exports = Create;