// const db = require("../config/db");

// const getAllCourses = async (req, res) => {
//   try {
//     const [result] = await db.query(`SELECT * FROM courses`);
//     res.status(200).json({
//       success: true,
//       message: "Courses data retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Unable to retrieve courses",
//       error,
//     });
//   }
// };

// const addCourse = async (req, res) => {
//   const { name, img, description, Date_start, Date_fin, instructor } = req.body;
//   try {
//     const result = await db.query(
//       `INSERT INTO courses (name, img, description,Date_start,Date_fin, instructor) VALUES (?,?,?,?,?,?);`,
//       [name, img, description, Date_start, Date_fin, instructor]
//     );
//     console.log(result);
//     res.status(201).json({
//       success: true,
//       message: "Course added successfully",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Unable to add new course",
//       error,
//     });
//   }
// };

// const getCourseByID = async (req, res) => {
//   try {
//     const [result] = await db.query(`SELECT * FROM courses WHERE id = ?`, [
//       req.params.id,
//     ]);
//     res.status(200).json({
//       success: true,
//       message: "Course data retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Unable to retrieve course data",
//       error,
//     });
//   }
// };



// const deleteCourse = async (req, res) => {
//   const courseId = req.params.id;
//   try {
//     const result = await db.query(`DELETE FROM courses WHERE id = ?`, [
//       courseId,
//     ]);
//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }
//     res.json({
//       success: true,
//       message: "Course deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unable to delete course",
//       error,
//     });
//   }
// };

// module.exports = { getAllCourses, addCourse, getCourseByID, deleteCourse };

const db = require("../config/db");

const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO users (fullName, email, password, role) VALUES (?,?,?,?);`,
      [fullName, email, password, role]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to register user",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password]);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to login",
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [result] = await db.query(`SELECT id, fullName, email, role FROM users`);
    res.status(200).json({
      success: true,
      message: "Users data retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to retrieve users",
      error,
    });
  }
};
  
  const getUserByID = async (req, res) => {
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
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.query(`DELETE FROM users WHERE id = ?`, [userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete user",
      error,
    });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, deleteUser,getUserByID };