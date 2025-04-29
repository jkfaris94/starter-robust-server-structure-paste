const router = require("express").Router(); //creates a new instance of an Express router.
const controller = require("./pastes.controller"); //imports the /pastes controller that you created earlier.

router.route("/").get(controller.list); //using route() allows you to write the path once and then link multiple route handlers to that path.
//get(controller.list) uses the list() route handler defined in the controller for GET requests to /

module.exports = router; //exports the router for use in app.js.