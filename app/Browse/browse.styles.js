var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  list: {
    backgroundColor: '#c9d0d5',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderBottomColor: '#b5bfc6',
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    color: '#196EEE',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#839496',
  },
  description: {
    color: '#5b6b77',
    fontSize: 13,
    lineHeight: 18,
  },
});

module.exports = styles;