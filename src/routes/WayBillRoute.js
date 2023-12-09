const express = require("express");
const wayBillController = require("../controllers/WayBillController");
const router = express.Router();

router.get("/", wayBillController.index);
router.post("/", wayBillController.store);
// router.get("/create", blogController.create);
router.get("/:id", wayBillController.detail);
// router.delete("/:id", blogController.destroy);
module.exports = router;
