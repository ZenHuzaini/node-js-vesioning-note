const Schema = require("mongoose").Schema;

const NoteVersionSchema = new Schema({
  noteRefference: {
    type: Schema.Types.ObjectId,
    ref: "Note",
  },
  data: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      version: {
        type: Number,
        default: 0,
        required: true,
      },
      modifiedDate: {
        type: Date,
        default: Date.now,
        required: true,
      },
    },
  ],
});

module.exports = NoteVersionSchema;
