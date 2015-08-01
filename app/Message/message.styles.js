var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  messageText: {
    fontSize: 15,
    color: '#8d8d8d'
  }
});

module.exports = styles;