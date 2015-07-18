var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  photoContainer: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   height: 100,
   width: 309,
  },

  name: {
    fontSize: 18,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 60,
    color: '#196EEE',
    height: 100
  },

  photo: {
    width: 100,
    height: 100,
  },

  questsContainer: {
   marginTop: 30,
   flex: 1,
   width: 309,
   flexDirection: 'column',
   alignItems: 'stretch',
  },

  questButton: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#106CC8',
    borderColor: '#0d5ba9',
    borderRadius: 3,
    opacity: 1,
  },

  questButtonText: {
    padding: 30,
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: '#000000',
    borderRightColor: '#000000',
  },

  logoutButtonContainer: {
    flex: 1,
    width: 309,
    marginTop: 20,
    alignItems: 'center',
  },

  logoutButton: {
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#106CC8',
    borderColor: '#0d5ba9',
    borderRadius: 3,
    opacity: 1,
  },

  logoutButtonText: {
    padding: 15,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: '#000000',
    borderRightColor: '#000000',
  }

});

module.exports = styles;