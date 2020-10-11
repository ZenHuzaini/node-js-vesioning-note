const Repositories = require("./Repositories");
module.exports = class NoteRepository extends Repositories {
  constructor(dependencies) {
    super(dependencies.noteModel);
  }
};
