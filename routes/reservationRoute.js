const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // Include this line to import mysql2
const reservationController = require("../controllers/reservationController");
router.get("/", reservationController.getAllReservations);
router.get("/get//", reservationController.getReservationByUserID);
router.get("/get/", reservationController.getReservationByEventID);
router.post("/addReservation", reservationController.addReservation);
router.delete('/deleteReservation/:id', reservationController.deleteReservation);
module.exports = router;