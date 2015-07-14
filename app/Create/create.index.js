var React = require('react-native');
var styles = require('./create.styles.js')
var {
  Text,
  View,
  } = React;

class Create extends React.Component {
  render() {
    console.log(this.props.navigator);

    return (
      <View style={styles.container}>
        <Text style={styles.description}>{this.props.test}</Text>
      </View>
    )
  } // end of render()
} // end of Create class

module.exports = Create;