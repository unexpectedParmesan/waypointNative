var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
  },
  description: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

module.exports = styles;