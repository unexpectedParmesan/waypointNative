var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
    paddingTop: 64,
  },
  scroll: {
    height: 500,
  },
  label: {
    color: '#4d5a63',
    fontWeight: '500',
    marginBottom: 5,
    fontSize: 12,
    marginRight: 5,
    marginLeft: 5,
  },
  waypointGroup: {
    flex: 1,
    flexDirection: 'row'
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
  waypointInput: {
    height: 30,
    lineHeight: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#b5bfc6',
    flex: 1,
    flexDirection: 'row',
    fontSize: 13,
    padding: 5,
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  inputLong: {
    height: 60,
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
  addWaypointButton: {
    marginTop: 30,
  },
  addWaypointText: {
    color: '#196EEE',
    textAlign: 'right',
  },
  removeWaypointButton: {
    marginTop: 5,
  },
  removeWaypointText: {
    color: '#DA3435',
    textAlign: 'right',
    fontSize: 12,
  },
  saveQuestButton: {
    marginTop: 40,
    backgroundColor: '#106CC8',
    padding: 15,
    borderWidth: 1,
    borderColor: '#0d5ba9',
    borderRadius: 3,
    opacity: 1,
  },

  saveQuestText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

module.exports = styles;