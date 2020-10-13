const NoteRepository = require("../../../source/persistence/repositories/NoteRepositories");
const sinon = require("sinon");
const expect = require("chai").expect;
const mongoose = require("mongoose");
require("./sinon-mongoose");

describe("Note Repository Flow", () => {
  const mockData = { data: "test" };
  const idMock = "1234";
  let noteRepository;
  let mockNoteModel;
  const noteModel = mongoose.model("noteModel", {});

  beforeEach(() => {
    mockNoteModel = sinon.mock(noteModel);
    noteRepository = new NoteRepository({ noteModel });
  });

  afterEach(() => {
    mockNoteModel.verify();
    mockNoteModel.restore();
  });

  it("should return all of the notes", async () => {
    mockNoteModel.expects("find").withArgs().chain("exec").resolves(mockData);

    const result = await noteRepository.find();
    expect(result).to.be.equal(mockData);
  });

  it("should be able to save the new note", async () => {
    mockNoteModel
      .expects("create")
      .withArgs(mockData)
      .chain("exec")
      .resolves(mockData);

    const result = await noteRepository.add(mockData);
    console.log(result);
    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(mockData));
  });

  it("should be able to delete the note if id is provided", async () => {
    mockNoteModel
      .expects("findOneAndDelete")
      .withArgs(idMock)
      .chain("exec")
      .resolves(mockData);

    const result = await noteRepository.removeById(idMock);
    console.log(result);
    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(mockData));
  });

  it("should be able to update the note if id and required param is provided", async () => {
    mockNoteModel
      .expects("findByIdAndUpdate")
      .withArgs(idMock, {
        data: "test",
      })
      .chain("exec")
      .resolves(mockData);

    const result = await noteRepository.updateById(idMock, {
      data: "test",
    });

    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(mockData));
  });
});
