const { Router } = require("express");
const { allbagsHandler, bagByIdHandler } = require("./bag.controller");

const router = Router();

// Public routes - no auth required
router.route("/").get(allbagsHandler);
router.get("/:bagId", bagByIdHandler);

module.exports = router;
