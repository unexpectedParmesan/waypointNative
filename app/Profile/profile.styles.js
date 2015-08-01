var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },

  container: {
    flexDirection: 'column',
    padding: 20,
    marginTop: 65,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
  },

  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  nameAndLogOutContainer: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '500',
    marginLeft: 6,
    color: '#555555',
  },

  logoutButton: {
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 3,
    width: 80,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#eeeeee',
  },

  logoutButtonText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#555555',
  },

  questsContainer: {
   marginTop: 20,
   flexDirection: 'column',
  },

  questButton: {
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#48B04A',
    borderColor: '#2F9032',
    borderRadius: 3,
    opacity: 1,
    marginBottom: 10,
  },

  questButtonText: {
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