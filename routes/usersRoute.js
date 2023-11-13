const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // Include this line to import mysql2
const usersController = require("../controllers/usersController");
router.get("/", usersController.getAllUsers);
router.get("/get/:id", usersController.getUserByID);
router.post("/addUser", usersController.registerUser);
router.post('/login', usersController.loginUser);
router.delete('/deleteUser/:id', usersController.deleteUser);
module.exports = router;