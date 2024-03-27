const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, paymentsController.listPayments);
router.post("/", authenticateToken, paymentsController.createPayment);
router.put("/:id", authenticateToken, paymentsController.updatePayment);
router.delete("/:id", authenticateToken, paymentsController.deletePayment);

module.exports = router;
