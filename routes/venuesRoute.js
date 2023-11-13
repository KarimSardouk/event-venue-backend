const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // Include this line to import mysql2
const venuesController = require("../controllers/venuesController");
router.get("/", venuesController.getAllVenues);
router.get("/get/:id", venuesController.getVenueByID);
router.post("/addVenue", venuesController.addVenue);
router.delete('/deleteUser/:id', venuesController.deleteVenue);
module.exports = router;