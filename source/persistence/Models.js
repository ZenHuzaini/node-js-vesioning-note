const DatabaseConnection = require("./DatabaseConnection");
const noteSchema = require("./schema/NoteSchema");
const noteVersionSchema = require("./schema/NoteVersionSchema");

const { createModel } = new DatabaseConnection();

module.exports = {
  noteModel: createModel("Note", noteSchema),
  noteVersionModel: createModel("NoteVersion", noteVersionSchema),
};
