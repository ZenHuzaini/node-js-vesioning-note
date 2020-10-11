const awilix = require("awilix");
const container = awilix.createContainer();

const noteController = require("./source/controller/NoteController/NoteController");
const noteService = require("./source/services/NoteService");
const noteRepository = require("./source/persistence/repositories/NoteRepositories");

const noteVersionController = require("./source/controller/NoteversionController/NoteVersionController");
const noteVersionService = require("./source/services/NoteVersionService");
const noteVersionRepository = require("./source/persistence/repositories/NoteVersionRepository");
const { asClass } = require("awilix");

module.exports = class Container {
  constructor() {}

  buildContainer() {
    const {
      noteModel,
      noteVersionModel,
    } = require("./source/persistence/Models");

    container.register({
      noteModel: awilix.asValue(noteModel),
      noteVersionModel: awilix.asValue(noteVersionModel),

      noteController: asClass(noteController),
      noteService: asClass(noteService),
      noteRepository: asClass(noteRepository),

      noteVersionController: asClass(noteVersionController),
      noteVersionService: asClass(noteVersionService),
      noteVersionRepository: asClass(noteVersionRepository),
    });

    const controllers = {
      NoteController: container.build(noteController),
      NoteVersionController: container.build(noteVersionController),
    };

    return controllers;
  }
};
