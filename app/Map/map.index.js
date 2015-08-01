'use strict';

var React = require('react-native');
var styles = require('./map.styles.js');
var Waypoint = require('./Waypoint/waypoint.index.js');
var utils = require('./map.utils.js'); // utility functions for data munging

var {
  Text,
  View,
  MapView,
  AlertIOS,
  TouchableHighlight,
  ScrollView,
  } = React;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        coords: {} // initializes geolocation coordinates to be populated by navigator
      },
      expanded: false,
      arrived: false,
      waypoints: {
        annotations: props.quest.waypoints, //array of waypoints
        number: props.numWaypoints // number of waypoints in the quest
      },
      /*  coordinate distance between waypoints (computed using pythygorean theorem) --
          used for live-updating distance in miles via proportion to coordinate distance
       */
      distance: 0, // coordinate distance between waypoints (computed using pythygorean theorem)
      currentDistance: 0, // current distance from next waypoint
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
      miles: 0, // distance in miles between waypoints (fetched via one API call per point)
      currentMiles: 'loading...', // human-readable distance in miles from next waypoint
      // time: 0,  // uncomment if we want to track estimated time
      // currentTime: 0, // uncomment if we want to track estimated time
      currentIndex: this.props.currentIndex, // index of current waypoint; may be made obsolete after db integration
      directions: {}, // initialized object to hold MapQuest data
      alertShowing: false // tells whether an IOSAlert is currently showing: prevents
    };
    this.state.currentWaypoint = this.state.waypoints.annotations[this.props.currentIndex]; // initializes current waypoint
  } // look ma, no commas!

   /* This function makes an API call to calculate the distance to the next waypoint, then updates all
    * the distance-related state variables that need to be updated as a result
   */
  _getDirectionsToNextPoint() {
    var url = utils.getDirectionsUrl(this.state.position.coords, this.state.currentWaypoint);
    var context = this;
    fetch(url)
     .then((response) => {
      var mapquestDirections = JSON.parse(response._bodyText);
      var directions = {};
      directions.distance = mapquestDirections.route.distance;
      // directions.time = mapquestDirections.route.formattedTime; // useful only if we want to display est. time info
      // directions.legs = mapquestDirections.route.legs; // useful only if we want to give explicit directions
      context.setState({directions}, () => { // setState is async! hence the callbacks
        context.setState({miles: directions.distance}, () => {
          context.setState({currentMiles: utils.milesToEnglish(context.state.miles)});
        });
        // context.setState({time: directions.time}, () => {
        //   context.setState({currentTime: context.state.time}); // uncomment if we want to display estimated time
        // });
        context.setState({distance: utils.coordinateDistance(context.state.position.coords, context.state.currentWaypoint)});
        // setTimeout(context._handleArrival.bind(context), 12000); // desktop debugging code for simulating arrival
      });
     })
     .catch((error) => {
      console.warn(error);
     });
  }

  /* Returns the height or width that the map should have to accomodate both the user's current location and the
   * current waypoint.
   * axis must be either "longitude" or "latitude".
  */
  _getCoordinateDelta(axis) {
    if (!this.state.position.coords[axis] || !this.state.currentWaypoint[axis]) {
      return 0.001;
    }
    return Math.max(0.001, Math.abs(this.state.position.coords[axis] - this.state.currentWaypoint[axis]) * 2.5);
  }


  /* Renders title, map, and distance from next waypoint.
  * The title is passed in as a property and appears in the first Text component.
  * In MapView, latitude/longitude appear at the center of the map;
  * latitudeDelta and longitudeDelta govern map height and width, respectively.
  * showsUserLocation={true} ensures that user location is displayed as a pusling blue dot.
  * annotations are the pins shown on the map and must be an array of objects.
  */
  render() {
    var nextWaypointButton;
    if (this.state.arrived && this.state.currentIndex < this.props.quest.waypoints.length - 1) {
      nextWaypointButton = (
        <TouchableHighlight
          style={styles.nextWaypointButton}
          onPress={() => {
            this.state.expanded = false;
            this.state.arrived = false;
            this._onNextPress();
          }}>
          <Text style={styles.nextWaypointButtonText}>{'Next Waypoint'}</Text>
        </TouchableHighlight>
      )
    } else if (this.state.arrived && this.state.currentIndex === this.props.quest.waypoints.length - 1) {
      nextWaypointButton = (
        <TouchableHighlight
          style={styles.nextWaypointButton}
          onPress={() => {
            this.state.expanded = false;
            this.state.arrived = false;
            this._updateQuestStatus();
            this.props.navigator.popToTop();
          }}>
          <Text style={styles.nextWaypointButtonText}>{'Exit Quest'}</Text>
        </TouchableHighlight>
      )
    } else {
      nextWaypointButton = <View />
    }

    var description;
    if (this.state.expanded) {
      // description = (
      //   <View>
      //     <ScrollView style={styles.scrollView} centerContent={false}>
      //       <Text style={styles.description}>{this.props.quest.waypoints[this.state.currentIndex].description}</Text>
      //     </ScrollView>
      //     {nextWaypointButton}
      //   </View>
      // )
      description = (
        <Waypoint 
          description={ this.props.quest.waypoints[this.state.currentIndex].description } 
          title = { this.props.quest.waypoints[this.state.currentIndex].title } 
          button={ nextWaypointButton } 
          navigator={ this.props.navigator }
          url= { this.props.quest.waypoints[this.state.currentIndex].media_url } />
      );
    } else {
      description = <View />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.position.coords.latitude || 37.785834,
            latitudeDelta: this.state.latitudeDelta,
            longitude: this.state.position.coords.longitude || -122.406417,
            longitudeDelta: this.state.longitudeDelta
          }}
          showsUserLocation={true}
          annotations={ [this.state.currentWaypoint] } />
        <View style={styles.statusContainer}>
          <TouchableHighlight
            onPress={() => {
              this.state.expanded = !this.state.expanded;
            }}>
            <View style={styles.statusHeader}>
              <Text style={ {color: 'white'} }> { this.state.expanded ? '' : '^'} </Text>
              <Text style={styles.statusHeaderText}>
                {this.state.currentMiles}
              </Text>
              <Text style={styles.statusHeaderText}>
                {this.props.quest.waypoints[this.state.currentIndex].title}
              </Text>
            </View>
          </TouchableHighlight>
          {description}
        </View>
      </View>
    );
  }

  /* Invoked when the user presses "next" in an alert.
   * Updates the state as the user moves on to the next waypoint.
  */
  _onNextPress() {
    // checks whether we have reached the end of the quest. if so, does not move on.
    var next = this.state.currentIndex < this.state.waypoints.number - 1 ? this.state.currentIndex + 1 : null;
    var context = this;
    this.state.alertShowing = false; // hack to avoid buggy alert behavior
    this.setState({currentIndex: next}, () => {
      if (next) {
        context.setState({currentWaypoint: context.state.waypoints.annotations[next]}, () => {
          context._getDirectionsToNextPoint(); // results in one distance API call as next waypoint is queued up
        });
      } else {
        context.setState({currentWaypoint: null}); // if there are no more waypoints, currentWaypoint is null
      }
    });
  }

  _finishQuest(url) {
     fetch(url, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
     })
      .then((response) => {
      })
     .catch((error) => {
      console.warn('Server error trying to delete: ', error);
     });
  }

  _updateQuestIndex(url, newIndex) {
     fetch(url, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_waypoint_index: newIndex})
     })
      .then((response) => {
      })
     .catch((error) => {
      console.warn('Server error trying to update current index: ', error);
     });
  }

  _updateQuestStatus(next) {
    // if you finished, DELETE quest from userActiveQuests table
    // else, PUT new index (this.state.currentIndex) into table
    var url = this.props.url + 'users/' + this.props.user.userId + '/activeQuests/' + this.props.quest.id;
    if (!next) {
      this._finishQuest(url);
    } else {
      this._updateQuestIndex(url, next);
    }
  }

 /* Called by the navigator.geolocation.watchPosition function when user is close enough to destination/current waypoint.
 * Sets off a chain of events that eventually results in progression to the next waypoint.
 */
  _handleArrival() {
    var context = this;
    var next = this.state.currentIndex < this.state.waypoints.number - 1 ? this.state.currentIndex + 1 : null;
    if (this.state.currentWaypoint) {
      this._updateQuestStatus(next);
      this.state.arrived = true;
      this.state.expanded = true;
    }
  }

  /* Called at initialization to start the user along the quest. (Needed because the rest of the logic is kicked off by
   * arrival at successive waypoints)
  */
  _initQuest() {
    this._getDirectionsToNextPoint();
  }

  /* Returns current distance in human-readable format.
  * Calculates miles using proportial distances.
  */
  _getCurrentDistanceInMiles() {
    if (this.state.miles === 0 || this.state.currentDistance === 0 || this.state.distance === 0) {
      return '0 ft';
    }
    var miles = this.state.miles * (this.state.currentDistance / this.state.distance);
    return utils.milesToEnglish(miles);
  }

  // this function will execute after rendering on the client occurs
  componentDidMount() {

    // navigator is available via the Geolocation polyfill in React Native
    // http://facebook.github.io/react-native/docs/geolocation.html#content
    //
    // navigator is the object through which you interact with the Geolocation interface
    //
    // *** Polyfill definition needs to be verified
    // React Native allows for polyfills--code that provides functionality available in the browser, but
    // that is not currently available in the runtime environment on mobile devices ***
    // Geolocation is enabled by default when you create a project with react-native init.
    //
    // getCurrentPosition() and watchPostion() take a success callback, error callback, and options object
    var context = this;
    navigator.geolocation.getCurrentPosition(
      (position) => { // success callback: sets initial position and initializes first waypoint
        context.setState({position}, () => {
          context._initQuest();
        });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    /* watchPosition() is called every fraction of a second and continually updates
    * the app with current location information.
    * (Note that in an xcode simulator environment, "position" is not equivalent to the placement of the blue dot.)
    */
    navigator.geolocation.watchPosition(
      (position) => {
        context.setState({position}, () => {
          if (context.state.currentIndex !== null) {
            // updates current-distance-related state variables
            context.setState({
              currentDistance: utils.coordinateDistance(context.state.position.coords, context.state.currentWaypoint)}, () => {
              context.setState({latitudeDelta: context._getCoordinateDelta('latitude'), // updates region for map display
                                longitudeDelta: context._getCoordinateDelta('longitude')});
              context.setState({currentMiles: context._getCurrentDistanceInMiles()});
              // sets off arrival logic if we're close enough to waypoint
              if (context.state.currentDistance <= 0.0003 && !context.state.alertShowing) {
                context._handleArrival();
              }
            });
          }
        })
       },
       (error) => alert(error.message),
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

  }
}

module.exports = Map;
