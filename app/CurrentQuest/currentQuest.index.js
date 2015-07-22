'use strict';

var React = require('react-native');
var styles = require('./currentQuest.styles.js');
var utils = require('./currentQuest.utils.js'); // utility functions for data munging

var {
  Text,
  View,
  } = React;

var Map = require('../Map/map.index.js');


class CurrentQuest extends React.Component {

  constructor(props) {
    console.log('user ' + props.user + 'is starting quest ' + props.quest);
    super(props);

  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>{this.props.quest.title}</Text>
        <Map quest={this.props.quest}>
        </Map>
      </View>
    )
  }

}

module.exports = CurrentQuest;
