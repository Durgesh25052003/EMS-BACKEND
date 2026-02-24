const express = require("express");
const eventController = require("../Controllers/eventController");

const Router = express.Router();

Router.route("/get-events").get(eventController.getAllEvents);
Router.route("/create-event").post(eventController.createEvent);
Router.route("/add-event/:eventId").patch(eventController.updateEvent);

module.exports = Router;
