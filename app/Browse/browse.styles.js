var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  itemContainer: {
    flex: 1,
  },
  listView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#DA552F'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    marginTop: 10
  }
});

module.exports = styles;