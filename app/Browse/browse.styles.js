var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  list: {
    backgroundColor: '#eeeeee',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 2, 
    color: '#3784d3',
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 5,
    color: '#7f7f7f',
  },
  description: {
    color: '#555555',
    fontSize: 15,
    lineHeight: 18,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = styles;