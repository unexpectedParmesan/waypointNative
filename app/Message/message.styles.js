var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  messageText: {
    fontSize: 20,
    color: '#8d8d8d'
  }
});

module.exports = styles;