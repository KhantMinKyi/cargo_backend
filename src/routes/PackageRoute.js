const express = require("express");
const PackageController = require("../controllers/PackageController");
const router = express.Router();

router.get("/", PackageController.index);
router.post("/", PackageController.store);
// router.get("/create", blogController.create);
router.get("/:id", PackageController.detail);
// router.delete("/:id", blogController.destroy);
module.exports = router;
