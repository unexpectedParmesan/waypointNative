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
    padding: 15,
    fontWeight: 'bold',
    fontSize: 20,
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
    marginBottom: 24,
  },
  map: {
    // position: 'absolute',
    flex: 1,
    // flexDirection: 'column',

    // right: 0,
    // left: 0,
    // top: 60,
    // bottom: 60,
    // margin: 5,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
  },
});

module.exports = styles;
