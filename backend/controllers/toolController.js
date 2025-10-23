const Tool = require("../models/toolModel.js");

const createTool = async (req, res) => {
  try {
    const tool = await Tool.create(req.body);
    res.status(201).json({ message: "Tool created", Tool });
  } catch (err) {
    res.status(500).json({ message: "Error creating Tool" });
  }
};

const getTools = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Tools" });
  }
};

const getToolById = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.status(200).json(Tool);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Tool" });
  }
};

const updateTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.status(200).json({ message: "Tool updated", Tool });
  } catch (err) {
    res.status(500).json({ message: "Error updating Tool" });
  }
};

const deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.status(200).json({ message: "Tool deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting Tool" });
  }
};


module.exports = { createTool, getTools, getToolById, updateTool, deleteTool };