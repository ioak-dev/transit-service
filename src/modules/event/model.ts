var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const eventCollection = "event";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { eventSchema, eventCollection };
