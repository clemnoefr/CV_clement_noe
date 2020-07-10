const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  nom  : { type: String, required: true },
  prenom: { type: String, required: true },
  comment: { type: String, required: true },
 
});

module.exports = mongoose.model("Comment", commentSchema);