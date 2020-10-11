const Repositories = require("./Repositories");
module.exports = class NoteVersionRepository extends Repositories {
  constructor(dependencies) {
    super(dependencies.noteVersionModel);
  }
};
