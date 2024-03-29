var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const trackSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    eventId: { type: String },
    icon: { type: String },
    from: { type: Date },
    to: { type: Date },
    code: { type: Number },
    group: { type: String },
    location: { type: String },
    registration: { type: String }, // required | optional | na
    exclusiveGroup: { type: String },
  },
  { timestamps: true }
);

const trackCollection = "track";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { trackSchema, trackCollection };
