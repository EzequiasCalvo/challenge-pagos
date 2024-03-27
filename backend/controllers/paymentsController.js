const pool = require("../config/dbConfig");

// List all payments
exports.listPayments = async (req, res) => {
  const userId = req.user.id;
  try {
    const allPayments = await pool.query(
      "SELECT * FROM Payments WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(allPayments.rows);
  } catch (err) {
    res.status(500).send("Error retrieving payments: " + err.message);
  }
};

// Create a new payment
exports.createPayment = async (req, res) => {
  const { amount, payment_type, recipient, description } = req.body;
  const userId = req.user.id;

  try {
    const newPayment = await pool.query(
      "INSERT INTO Payments (user_id, amount, payment_type, recipient, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, amount, payment_type, recipient, description]
    );
    res.status(201).json(newPayment.rows[0]);
  } catch (err) {
    res.status(500).send("Error creating payment: " + err.message);
  }
};

// Update an existing payment
exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { amount, payment_type, recipient, description } = req.body;
  try {
    const updatedPayment = await pool.query(
      "UPDATE Payments SET amount = $1,  payment_type = $2, recipient = $3, description = $4 WHERE id = $5 RETURNING *",
      [amount, payment_type, recipient, description, id]
    );
    if (updatedPayment.rows.length === 0) {
      return res.status(404).send("Payment not found");
    }
    res.status(200).json(updatedPayment.rows[0]);
  } catch (err) {
    res.status(500).send("Error updating payment: " + err.message);
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteOp = await pool.query(
      "DELETE FROM Payments WHERE id = $1 RETURNING *",
      [id]
    );
    if (deleteOp.rows.length === 0) {
      return res.status(404).send("Payment not found");
    }
    res.status(204).send("Payment deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting payment: " + err.message);
  }
};
