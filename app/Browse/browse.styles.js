var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  list: {
    backgroundColor: '#f3f3f3',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    color: '#348F38',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#8d8d8d',
  },
  description: {
    color: '#606060',
    fontSize: 13,
    lineHeight: 18,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = styles;