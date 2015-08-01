var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({

  statusContainer: {
    backgroundColor: "rgba(0, 0, 0, .8)",
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    paddingBottom: 45,
  },

  statusHeader: {
    padding: 5,
  },

  statusHeaderText: {
    color: "#fff",
    textAlign: 'center',
    fontSize: 20,
  },

  scrollView: {
    height: 200,
  },

  description: {
    color: "#fff",
    fontSize: 18,
    padding: 10,
  },

  nextWaypointButton: {
    backgroundColor: '#ddd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
    padding: 20
  },

  nextWaypointButtonText: {
    color: '#000',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    position: 'absolute',
    top: 10,
    right: 0,
    left: 0,
    padding: 16,
    fontSize: 24,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  coords: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 60,
  },
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

module.exports = styles;
