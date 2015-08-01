var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  scroll: {
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    padding: 20,
  },
  content: {
    position: 'relative',
    marginTop: 44,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    color: '#3784d3'
  },
  creator: {
    marginTop: 10,
    color: '#7f7f7f',
  },
  map: {
    position: 'relative',
    height: 200,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    marginTop: 10,
  },
  details: {
    flex: 1,
    fontSize: 15,
    lineHeight: 18,
    color: '#7f7f7f',
    marginTop: 10,
  },
  description: {
    color: '#555555',
    fontSize: 17,
    lineHeight: 20,
    marginTop: 10,
  },
  startQuestButton: {
    marginTop: 30,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#48B04A',
    borderColor: '#2F9032',
    borderRadius: 3,
    opacity: 1,
  },
  deleteQuestButton: {
    marginTop: 10,
    backgroundColor: '#D32E2E',
    borderWidth: 1,
    borderColor: '#7E5555',
    borderRadius: 3,
    opacity: 1,
  },
  buttonText: {
    padding: 15,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: '#000000',
    borderRightColor: '#000000',
  },
});

module.exports = styles;