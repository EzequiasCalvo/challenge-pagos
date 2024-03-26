const express = require("express");
const paymentsController = require("../controllers/paymentsController");
const router = express.Router();

router.get("/", paymentsController.listPayments);
router.post("/", paymentsController.createPayment);
router.put("/:id", paymentsController.updatePayment);
router.delete("/:id", paymentsController.deletePayment);

module.exports = router;
