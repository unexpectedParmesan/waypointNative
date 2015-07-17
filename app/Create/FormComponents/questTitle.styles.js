var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  label: {
    color: '#4d5a63',
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 12,
    marginRight: 5,
    marginLeft: 5,
  },
  input: {
    height: 30,
    lineHeight: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#b5bfc6',
    flex: 1,
    flexDirection: 'row',
    fontSize: 13,
    padding: 4,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
});

module.exports = styles;