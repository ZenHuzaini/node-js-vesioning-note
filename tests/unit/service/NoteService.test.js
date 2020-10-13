const NoteService = require("../../../source/services/NoteService");
const NoteRepository = require("../../../source/persistence/repositories/NoteRepositories");
const NoteVersionRepository = require("../../../source/persistence/repositories/NoteVersionRepository");
const expect = require("chai").expect;
const sinon = require("sinon");
const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
} = require("../../../source/controller/NoteController/NoteConstants");

describe("Note Service Flow", () => {
  let mockNoteService;
  let noteService;
  let noteRepository;

  let noteVersionRepository;
  let mockNoteVersionRepository;
  let mockNoteRepository;

  const idNote = "b8ed35-d195-591e-82e8-64840bc751b6";
  let mockData = {
    status: "Operation has been successfully performed",
    data: [
      {
        _id: "5f831ab6d261d820ac6635f1",
        content: "zen",
        title: "bujlo",
        createdAt: "2020-10-11T14:46:14.076Z",
        updatedAt: "2020-10-11T14:46:14.076Z",
        __v: 0,
      },
    ],
  };

  let inputData = {
    content: "zen",
    title: "bujlo",
  };

  beforeEach(() => {
    noteRepository = new NoteRepository({});
    noteVersionRepository = new NoteVersionRepository({});

    mockNoteVersionRepository = sinon.mock(noteVersionRepository);
    mockNoteRepository = sinon.mock(noteRepository);

    noteService = new NoteService({ noteRepository, noteVersionRepository });
    mockNoteService = sinon.mock(noteService);
  });

  // afterEach(() => {
  //   mockNoteService.verify();
  //   mockNoteRepository.verify();

  //   mockNoteService.restore();
  //   mockNoteRepository.restore();
  // });

  describe("Getting Notes", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository.expects("find").resolves(mockData);
      mockNoteService.expects("getNotes").withArgs().resolves(mockData);

      const actual = await noteService.getNotes();
      expect(actual).to.be.eql(mockData);
    });

    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository.expects("find").resolves([]);
      mockNoteService
        .expects("getNotes")
        .withArgs()
        .resolves({ status: SUCCESS, data: "No data is found!" });

      const actual = await noteService.getNotes();
      expect(actual).to.be.eql({ status: SUCCESS, data: "No data is found!" });
    });

    it("Should return 500 with response when error occured", async () => {
      mockNoteRepository.expects("find").rejects();
      mockNoteService
        .expects("getNotes")
        .withArgs()
        .resolves({ status: ERROR });

      const actual = await noteService.getNotes();
      expect(actual).to.be.eql({ status: ERROR });
    });
  });

  describe("Getting Notes based on ID", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository
        .expects("find")
        .withArgs({ _id: idNote })
        .resolves(mockData);
      mockNoteService.expects("getNotes").withArgs(idNote).resolves(mockData);

      const actual = await noteService.getNotes(idNote);
      expect(actual).to.be.eql(mockData);
    });

    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository.expects("find").resolves([]);
      mockNoteService
        .expects("getNotes")
        .withArgs()
        .resolves({ status: SUCCESS, data: "No data is found!" });

      const actual = await noteService.getNotes();
      expect(actual).to.be.eql({ status: SUCCESS, data: "No data is found!" });
    });

    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository.expects("find").resolves([]);
      mockNoteService
        .expects("getNotes")
        .withArgs()
        .resolves({ status: SUCCESS, data: "No data is found!" });

      const actual = await noteService.getNotes();
      expect(actual).to.be.eql({ status: SUCCESS, data: "No data is found!" });
    });

    it("Should return 500 with response when error occured", async () => {
      mockNoteRepository.expects("find").rejects();
      mockNoteService
        .expects("getNotes")
        .withArgs()
        .resolves({ status: ERROR });

      const actual = await noteService.getNotes();
      expect(actual).to.be.eql({ status: ERROR });
    });
  });

  describe("Save Notes", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository.expects("add").withArgs(inputData).resolves(mockData);
      mockNoteVersionRepository
        .expects("add")
        .withArgs({
          noteRefference: "id",
          data: [mockData],
        })
        .resolves(mockData);

      mockNoteService
        .expects("saveNote")
        .withArgs(inputData)
        .resolves(mockData);

      const actual = await noteService.saveNote(inputData);
      expect(actual).to.be.eql(mockData);
    });

    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository.expects("add").withArgs(inputData).resolves(mockData);
      mockNoteVersionRepository
        .expects("add")
        .withArgs({
          noteRefference: "id",
          data: [mockData],
        })
        .resolves(mockData);

      mockNoteService
        .expects("saveNote")
        .withArgs(inputData)
        .resolves(mockData);

      const actual = await noteService.saveNote(inputData);
      expect(actual).to.be.eql(mockData);
    });
  });

  describe("Update Notes", () => {
    it("Should return 200 with response when the parameters are provided", async () => {
      mockNoteRepository
        .expects("find")
        .withArgs({ _id: "id" })
        .resolves(mockData);

      mockNoteRepository
        .expects("updateById")
        .withArgs({ _id: "id", inputData })
        .resolves(mockData);

      mockNoteVersionRepository
        .expects("find")
        .withArgs({
          noteRefference: "id",
        })
        .resolves(mockData);

      mockNoteVersionRepository
        .expects("updateById")
        .withArgs({
          _id: "id",
          inputData,
        })
        .resolves(mockData);

      mockNoteService
        .expects("modifyNote")
        .withArgs("id", inputData)
        .resolves(mockData);

      const actual = await noteService.modifyNote("id", inputData);
      expect(actual).to.be.eql(mockData);
    });

    it("Should return 200 with response when the data is not found", async () => {
      mockNoteRepository.expects("find").withArgs({ _id: "id" }).resolves([]);

      const actual = await noteService.modifyNote("id", inputData);
      expect(actual).to.be.eql({ status: SUCCESS, data: "No data is found!" });
    });

    it("Should return 500 with response when the data cannot be updated because it has been removed", async () => {
      mockNoteRepository
        .expects("find")
        .withArgs({ _id: "id" })
        .resolves([{ deleted: true }]);

      const actual = await noteService.modifyNote("id", inputData);
      expect(actual).to.be.eql({
        status: ERROR,
        data: "Cannot update :( the data has been deleted!",
      });
    });
  });
});
