var React = require('react-native');

var { StyleSheet } = React;

var styles = StyleSheet.create({
 list: {
  backgroundColor: '#c9d0d5',
 },
 item: {
  flex: 1,
  padding: 10,
  backgroundColor: '#FFFFFF',
  marginTop: 10,
  borderBottomColor: '#b5bfc6',
  borderBottomWidth: 1,
 },
 title: {
  fontSize: 15,
  fontWeight: '500',
  lineHeight: 20,
  color: '#196EEE',
 },
 creator: {
  fontSize: 13,
  lineHeight: 18,
  color: '#839496',
 },
 description: {
  color: '#5b6b77',
  fontSize: 13,
  lineHeight: 18,
 },
});

module.exports = styles;