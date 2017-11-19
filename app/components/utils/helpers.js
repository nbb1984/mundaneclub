var axios = require("axios");
var helper = {
  // This logs in.
  getScheduleItems: function() {
    return axios.get("/api/schedule");
  },

  // This function hits our own server to retrieve the record of this user 
  createScheduleItem: function(newItem) {
    return axios.post("/api/schedule", newItem);
  },

  getScheduleItem: function(itemId) {
    return axios.get("api/schedule/" + itemId);
  },

  deleteScheduleItem: function (itemId) {
    return axios.get("/api/schedule/" + itemId);
  },

  getRosterEntries: function() {
    return axios.get("/api/roster");
  },

  getRosterEntry: function(entryId) {
    return axios.get("/api/roster/find/" + entryId);
  },

  createRosterEntry: function(newEntry) {
    return axios.post("/api/roster", newEntry);
  },

  deleteRosterEntry: function (entryId) {
    return axios.get("/api/roster/" + entryId);
  },

  getBlogPosts: function(postId) {
      return axios.get("/api/blog");
  },

  createBlogPost: function(newPost) {
    return axios.post("/api/blog", newPost);
  },

  deleteBlogPost: function(postId) {
    return axios.get("/api/blog/" + postId);
  },

  runQuery: function(schema, query) {
    return axios.get("/api/" + schema + "/" + query);
  },

  getUser: function() {
    return axios.get("/api/user");
  },

  logout: function(){
    return axios.get("/logout");
  }

};
// We export the API helper
module.exports = helper;