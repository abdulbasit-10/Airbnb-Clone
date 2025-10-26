const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  logo: { type: String },
  category: { type: String },
  pricing: { type: String },
  highlights: { type: String },
  twitter: { type: String },
  github: { type: String },
}, { timestamps: true });

module.exports =  mongoose.model("Tool", toolSchema);
