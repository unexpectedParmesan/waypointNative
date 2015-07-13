var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({
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
    // fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'flex-end',
    textAlign: 'center',
    // marginTop: 20,
  },
  coords: {
    // fontWeight: 'bold',
    fontSize: 20,
    // color: '#dddddd',
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginBottom: 60,
  },
  map: {
    position: 'absolute',
    right: 0,
    left: 0,
<<<<<<< HEAD
    top: 60,
    bottom: 80,
    margin: 10,
=======
    top: 0,
    bottom: 0,
>>>>>>> (feat) Display navbar and view content
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
  },
});

module.exports = styles;
