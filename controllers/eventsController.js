const db = require("../config/db");

const getAllEvents = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM events`);
    res.status(200).json({
      success: true,
      message: "Events data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve events",
      error,
    });
  }
};

const addEvent = async (req, res) => {
  const { title, date, ticketPrice, description } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO events (title, date, ticketPrice, description) VALUES (?,?,?,?);`,
      [title, date, ticketPrice, description]
    );
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Event added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to add new event",
      error,
    });
  }
};

const getEventByID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM events WHERE id = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "Event data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve event data",
      error,
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const result = await db.query(`DELETE FROM events WHERE id = ?`, [eventId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete event",
      error,
    });
  }
};

module.exports = { getAllEvents, addEvent, getEventByID, deleteEvent };