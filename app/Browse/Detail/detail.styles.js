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
    marginTop: 64,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
  },
  creator: {
    marginTop: 10,
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
    color: '#839496',
    marginTop: 10,
  },
  description: {
    color: '#5b6b77',
    fontSize: 17,
    lineHeight: 20,
    marginTop: 10,
  },
  startQuestButton: {
    marginTop: 20,
    backgroundColor: '#106CC8',
    padding: 15,
    borderWidth: 1,
    borderColor: '#0d5ba9',
    borderRadius: 3,
    opacity: 1,
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: '#000000',
    borderRightColor: '#000000',
  },
});

module.exports = styles;