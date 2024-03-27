const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./config/dbConfig");
const paymentRoutes = require("./routes/paymentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ credentials: true }));
app.use(bodyParser.json());

app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
