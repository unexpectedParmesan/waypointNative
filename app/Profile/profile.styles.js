var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },

  container: {
    flexDirection: 'column',
    padding: 30,
    marginTop: 65,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  photoContainer: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   height: 100,
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
   marginTop: 20,
   flexDirection: 'column',
  },

  questButton: {
    flex: 1,
    borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#106CC8',
    borderColor: '#0d5ba9',
    borderRadius: 3,
    opacity: 1,
  },

  questButtonText: {
    padding: 20,
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