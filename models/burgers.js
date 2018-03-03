//Import ORM =====================================================================
var orm = require("../config/orm.js");

//Burger Object ==================================================================
var burger = {
  selectAll: function(callback) {
    orm.selectAll("burgers", function(response) {
      callback(response);
    });
  },

  insertOne: function(columns, values, callback) {
    orm.insertOne("burgers", columns, values, function(response) {
      callback(response);
    });
  },

  updateOne: function(objectColumnValues, condition, callback) {
    orm.updateOne("burgers", objectColumnValues, condition, function(response) {
      callback(response);
    });
  },

  delete: function(condition, callback) {
    orm.delete("burgers", condition, function(response) {
      callback(response);
    });
  }
};

//Export ========================================================================
module.exports = burger;
