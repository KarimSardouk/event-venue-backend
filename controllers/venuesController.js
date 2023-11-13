const db = require("../config/db");

const getAllVenues = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM venues`);
    res.status(200).json({
      success: true,
      message: "Venues data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve venues",
      error,
    });
  }
};

const addVenue = async (req, res) => {
  const { name, description, capacity, image, address } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO venues (name, description, capacity, image, address) VALUES (?,?,?,?,?);`,
      [name, description, capacity, image, address]
    );
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Venue added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to add new course",
      error,
    });
  }
};

const getVenueByID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM venues WHERE id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "Venue data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve venue data",
      error,
    });
  }
};



const deleteVenue = async (req, res) => {
  const venueId = req.params.id;
  try {
    const result = await db.query(`DELETE FROM venues WHERE id = ?`, [
      venueId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }
    res.json({
      success: true,
      message: "Venue deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete venue",
      error,
    });
  }
};

module.exports = { getAllVenues, addVenue, getVenueByID, deleteVenue };