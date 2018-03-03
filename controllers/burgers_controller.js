//Dependencies ===================================================================
var express = require("express");
var router = express.Router();
var burgers = require("../models/burgers.js");

//Routing ========================================================================

//Select All =====================================================================
router.get("/", function(request, response) {
  burgers.selectAll(function(data) {
    var handlebarsObject = {
      burgers: data
    };
    console.log(handlebarsObject);
    response.render("index", handlebarsObject);
  });
});

//Insert One =====================================================================
router.post("/api/burgers", function(request, response) {
  burgers.insertOne([
    "burger_name", "devoured"
  ], [
    request.body.burger_name, request.body.devoured
  ], function(result) {
    response.json({ id: result.insertId });
  });
});

//Update One =====================================================================
router.put("/api/burgers/:id", function(request, response) {
  var condition = "id = " + request.params.id;

  console.log("condition", condition);

  burgers.updateOne({
    devoured: request.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return response.status(404).end();
    } 
    else {
      response.status(200).end();
    }
  });
});

//Delete ========================================================================
router.delete("/api/burgers/:id", function(request, response) {
  var condition = "id = " + request.params.id;

  burgers.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return response.status(404).end();
    } 
    else {
      response.status(200).end();
    }
  });
});

//Export ========================================================================
module.exports = router;
