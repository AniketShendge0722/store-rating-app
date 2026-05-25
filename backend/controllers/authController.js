const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const signup = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)";

    db.query(
      sql,
      [name, email, hashedPassword, address, role],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Registration Failed",
          });
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};



// LOGIN FUNCTION
const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database Error",
        });
      }

      // user not found
      if (result.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = result[0];

      // compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }

      // JWT token
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({
        message: "Login Successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// GET ALL USERS
const getUsers = (req, res) => {
  try {
    const sql =
      "SELECT id,name,email,address,role FROM users";

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch users",
        });
      }

      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
    getUsers,
    
};