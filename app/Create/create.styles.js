var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15, 
    paddingTop: 64,
  },
  scroll: {
    height: 300,
  },
  label: {
    color: '#000000',
    marginBottom: 5,
  },
  textInputShort: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    flex: 1,
    flexDirection: 'row',
    fontSize: 13,
    padding: 4,
    borderRadius: 3,
    marginBottom: 10,
  },
  textInputLong: {
    height: 70,
    borderWidth: 0.5,
    borderColor: '#C0C0C0',
    flex: 1,
    fontSize: 13,
    padding: 4,
    borderRadius: 3,
  },
  addWaypointButton: {
    marginTop: 15,
  },
  addWaypointText: {
    color: '#196EEE',
    textAlign: 'right',
  },
});

module.exports = styles;

