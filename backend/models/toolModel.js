const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  websiteUrl: { type: String },
  logoUrl: { type: String },
  category: { type: String },
  pricingType: { type: String },
  keyHighlight: { type: String },
  twitterUrl: { type: String },
  githubUrl: { type: String },
}, { timestamps: true });

module.exports =  mongoose.model("Tool", toolSchema);
