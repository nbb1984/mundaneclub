var axios = require("axios");
var helper = {

  createItem: function(route, newItem) {
  	console.log(route);
  	console.log(newItem);
    return axios.post("/api/" + route, newItem);
  },

  getItem: function(route) {
    return axios.get("/api/" + route);
  },

  getItems: function(route) {
    return axios.get("/api/" + route);
  },

  deleteItem: function (route) {
    return axios.get("/api/" + route);
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