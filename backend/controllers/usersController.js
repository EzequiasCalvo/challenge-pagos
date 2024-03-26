const pool = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash user's password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user into the database
    const newUser = await pool.query(
      "INSERT INTO Users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, passwordHash]
    );

    // Create and send JWT token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send("Error registering user: " + err.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send("Email or password is incorrect.");
    }

    // Verify the password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).send("Email or password is incorrect.");
    }

    // Create and send JWT token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
};
