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
    fontSize: 20,
    color: '#348F38'
  },
  creator: {
    marginTop: 10,
    color: '#606060',
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
    color: '#8d8d8d',
    marginTop: 10,
  },
  description: {
    color: '#606060',
    fontSize: 17,
    lineHeight: 20,
    marginTop: 10,
  },
  startQuestButton: {
    marginTop: 20,
    backgroundColor: '#48B04A',
    padding: 15,
    borderWidth: 1,
    borderColor: '#348F38',
    borderRadius: 3,
    opacity: 1,
  },
  deleteQuestButton: {
    marginTop: 30,
    backgroundColor: '#BA5C5C',
    padding: 15,
    borderWidth: 1,
    borderColor: '#7E5555',
    borderRadius: 3,
    opacity: 1,
    alignItems: 'center'
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