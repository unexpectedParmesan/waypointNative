var helpers = {};

helpers.finishQuest = function(url) {
 fetch(url, {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
 })
  .then((response) => {
  })
 .catch((error) => {
  console.warn('Server error trying to delete: ', error);
 });
};

helpers.updateQuestIndex = function(url, newIndex) {
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
};

helpers.newUser = function(url, userData, callback) {
 fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ facebookId: userData.userId, name: userData.name, profilePic: userData.photoUrl })
 })
  .then((response) => {
   callback(userData);
  })
  .catch((error) => {
    console.warn(error);
  });
};

module.exports = helpers;