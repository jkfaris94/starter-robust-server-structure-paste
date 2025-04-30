const router = require("express").Router(); //creates a new instance of an Express router.
const controller = require("./pastes.controller"); //imports the /pastes controller that you created earlier.
const methodNotAllowed = require("../errors/methodNotAllowed"); //methodNotAllowed added in

router
.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed);
//using route() allows you to write the path once and then link multiple route handlers to that path.
//get(controller.list) uses the list() route handler defined in the controller for GET requests to /

router
.route("/:pasteId")
.get(controller.read)
.put(controller.update)
.delete(controller.delete)
.all(methodNotAllowed);

module.exports = router; //exports the router for use in app.js.