var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
  },
  description: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  headingContainer: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  heading: {
    fontSize: 32, 
    color: '#606060',
    fontWeight: '200',
    marginLeft: 5,
    bottom: 2,
  },
  icon: {
    width: 22,
    height: 34,
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  login: {
    fontSize: 60,
    padding: 100,
  },
  mapIllustration: {
    width: 300,
    height: 250,
    marginBottom: 70,
    backgroundColor: '#FFFFFF',
  }
});

module.exports = styles;
