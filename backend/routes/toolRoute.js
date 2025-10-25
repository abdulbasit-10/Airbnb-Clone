const express = require("express");
const { createTool, getToolById, getTools, updateTool, deleteTool } = require("../controllers/toolController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js"); // optional

const router = express.Router();

router.post("/", createTool); 
router.get("/", getTools);
router.get("/:id", getToolById);
router.put("/:id", updateTool);
router.delete("/:id", deleteTool);

module.exports = router;
