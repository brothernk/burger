//Import Connection ==============================================================
var connection = require("../config/connection.js");

//MySQL Syntax ===================================================================

//Stringify Question Marks
function printQuestionMarks(number) {
  var array = [];
  for (var i = 0; i < number; i++) {
    array.push("?");
  }
  return array.toString();
}

//Convert Object to MySQL Syntax
function objectToSql(object) {
  var array = [];
  for (var key in object) {
    var value = object[key];
    
    if (Object.hasOwnProperty.call(object, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      array.push(key + "=" + value);
    }
  }
  return array.toString();
}

//ORM Object ====================================================================
var orm = {

  //Select All ==================================================================
  selectAll: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      callback(result);
    });
  },

  //Insert One =================================================================
  insertOne: function(table, columns, values, callback) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += columns.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(values.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, values, function(error, result) {
      if (error) {
        throw error;
      }
      callback(result);
    });
  },
  
  //Update One =================================================================
  updateOne: function(table, objectColumnValues, condition, callback) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objectToSql(objectColumnValues);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      callback(result);
    });
  },

  //Delete =====================================================================
  delete: function(table, condition, callback) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(error, result) {
      if (error) {
        throw error;
      }
      callback(result);
    });
  }
};

// Export =====================================================================
module.exports = orm;
