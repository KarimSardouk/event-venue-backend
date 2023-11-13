const db = require("../config/db");

// const getAllReservations = async (req, res) => {
//   try {
//     const [result] = await db.query(`SELECT * FROM reservations`);
//     res.status(200).json({
//       success: true,
//       message: "Reservations data retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Unable to retrieve reservations",
//       error,
//     });
//   }
// };
const getAllReservations = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT reservations.*, users.fullName AS userName, venues.name AS venueName
      FROM reservations
      INNER JOIN users ON reservations.userID = users.id
      INNER JOIN venues ON reservations.venueID = venues.id
    `);

    res.status(200).json({
      success: true,
      message: "Reservations data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve reservations",
      error,
    });
  }
};

const addReservation = async (req, res) => {
  const { venueID, userID} = req.body;
  try {
    const result = await db.query(
      `INSERT INTO reservations (venueID, userID) VALUES (?,?);`,
      [venueID, userID]
    );
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Reservation added successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to add new reservation",
      error,
    });
  }
};


const getReservationByUserID = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT * FROM reservations WHERE userID = ?`, [
      req.params.id,
    ]);
    res.status(200).json({
      success: true,
      message: "Reservation data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve reservation data",
      error,
    });
  }
};

const getReservationByEventID = async (req, res) => {
    try {
      const [result] = await db.query(`SELECT * FROM reservations WHERE eventID = ?`, [
        req.params.id,
      ]);
      res.status(200).json({
        success: true,
        message: "Reservation data retrieved successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Unable to retrieve reservation data",
        error,
      });
    }
  };



const deleteReservation = async (req, res) => {
  const reservationId = req.params.id;
  try {
    const result = await db.query(`DELETE FROM reservations WHERE id = ?`, [
        reservationId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }
    res.json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete reservation",
      error,
    });
  }
};

module.exports = { getAllReservations, addReservation, getReservationByUserID,getReservationByEventID, deleteReservation };