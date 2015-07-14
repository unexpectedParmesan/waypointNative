  var utils = {};
  var secrets = require('../../secrets.js'); // for access to .gitignored API keys

 /*  Turns a decimal into human-readable representation of distance.
  *  If under 0.18 mile, converts to feet.
  */
  utils.milesToEnglish = function(miles) {
    if (miles === 0) {
      return '0 ft';
    }
    if (miles > 0.18) {
      var rounded = this._roundMiles(miles);
      return rounded + ' mi';
    } else {
      var feet = miles * 5280 + '';
      return feet.split('.')[0] + ' ft'; // ignores fractions of feet
    }
  }

  /* Rounds (or more accurately truncates) miles to the hundredth place.
   * Input: float; output: string
  */
  var roundMiles = function(miles) {
    var leftOfDecimal = Math.trunc(miles);
    var rightOfDecimal = (miles - leftOfDecimal + '').split('.')[1];
    rightOfDecimal = rightOfDecimal.slice(0, 2);
    return leftOfDecimal + '.' + rightOfDecimal;
  }

 /* Returns distance in coordinates (calculated using the pythygorean theorem) between two positions
  * with latitude and longitude properties
  */
  utils.coordinateDistance = function(pos1, pos2) {
    var latDist = pos1.latitude - pos2.latitude;
    var longDist = pos1.longitude - pos2.longitude;
    return Math.sqrt( Math.pow(latDist, 2) + Math.pow(longDist, 2) );
  }

     /* Returns the url required for a MapQuest directions API call that returns distance in miles, along with
    * a good deal of unused information.
   */
  utils.getDirectionsUrl = function(pos1, pos2) {
    var from= 'from=' + pos1.latitude + ',' + pos1.longitude;
    var to = 'to=' + pos2.latitude + ',' + pos2.longitude;
    var key = secrets.mapQuest;
    return 'http://www.mapquestapi.com/directions/v2/route?key=' + key + '&' + from + '&' + to + '&routeType=pedestrian';
  }

  module.exports = utils;
