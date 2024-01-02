const mongoose = require("mongoose");
const {isEmail} =require("validator");
const notesSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: [true,"Please provide user /email id"],
      validate:[isEmail, 'Please enter a valid email']
    },
    title: {
      type: String,
      required: [true,"Please fill the title"],
      trim: true,
      minlength: [5, 'Minimum length of title is 5 characters'],
      maxlength: [30, 'Maximum length of title is 30 characters'],
    },
    body: {
      type: String,
      required: [true,"Please fill the body"],
      trim: true,
      minlength: [10, 'Minimum length of body is 10 characters'],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Note", notesSchema);
