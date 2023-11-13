const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // Include this line to import mysql2
const eventsController = require("../controllers/eventsController");
router.get("/getAllEvents", eventsController.getAllEvents);
router.get("/get/:id", eventsController.getEventByID);
router.post("/addEvent", eventsController.addEvent);
router.delete('/deleteEvent/:id', eventsController.deleteEvent);
module.exports = router;