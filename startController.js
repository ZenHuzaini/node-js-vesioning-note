function startControllers(app, { NoteController, NoteVersionController }) {
  app.get("/note", NoteController.read);
  app.get("/note/:_id", NoteController.readOne);
  app.post("/note", NoteController.create);
  app.put("/note/:_id", NoteController.update);
  app.delete("/note/:_id", NoteController.delete);

  app.get("/note/deletedNote", NoteController.read);

  app.get("/noteVersions/", NoteVersionController.checkVersions);
  app.get("/noteVersion/:_id", NoteVersionController.checkVersion);

  app.get("/note/deletedNoteVersion", NoteController.read);

  app.get("*", (req, res) => {
    res.send("The endpoint doesnt exist");
  });
}

module.exports = { startControllers };
