var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const participantSchema = new Schema(
  {
    referenceId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    eventId: { type: String },
    email: { type: String },
    telephone: { type: String },
    emergencyContactName: { type: String },
    emergencyContactTelephone: { type: String },
    room: { type: String },
    groups: { type: Array },
    birthDate: { type: Date },
    joiningDate: { type: Date },
    practice: { type: String },
    customFields: { type: Object },
    firstDeclaration: { type: Boolean },
    secondDeclaration: { type: Boolean },
  },
  { timestamps: true }
);

const participantCollection = "participant";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { participantSchema, participantCollection };
