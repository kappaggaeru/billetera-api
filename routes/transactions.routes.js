const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactions.controller");

router.get("/", controller.list);
router.get("/:id", controller.find);
router.post("/", controller.add);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
