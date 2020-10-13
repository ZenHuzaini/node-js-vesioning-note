const sinon = require("sinon");
const expect = require("chai").expect;
const { mockRequest, mockResponse } = require("mock-req-res");
const Constants = require("../../../source/controller/NoteController/NoteConstants");
const NoteController = require("../../../source/controller/NoteController/NoteController");
const NoteService = require("../../../source/services/NoteService");
const {
  SUCCESS,
} = require("../../../source/controller/NoteController/NoteConstants");

describe("Versioning Note Controller Flow", () => {
  let noteController;
  let noteService;
  let mockNoteService;
  const idNote = "5f831a8ed261d820ac6635ee";
  let mockData = {
    status: "Operation has been successfully performed",
    data: [
      {
        _id: "5f831ab6d261d820ac6635f1",
        content: "lukasz",
        title: "bujlo",
        createdAt: "2020-10-11T14:46:14.076Z",
        updatedAt: "2020-10-11T14:46:14.076Z",
        __v: 0,
      },
    ],
  };
  const testData = {
    title: "test title",
    content: "test content",
  };

  beforeEach(() => {
    noteService = new NoteService({});
    mockNoteService = sinon.mock(noteService);
    noteController = new NoteController({ noteService });
  });

  afterEach(() => {
    mockNoteService.verify();
    mockNoteService.restore();
  });

  describe("Getting Note", () => {
    it("Should return 200 with response when trying to get all notes", async () => {
      const mockReq = mockRequest({});
      const mockRes = mockResponse();

      await mockNoteService.expects("getNotes").withArgs().resolves(mockData);

      await noteController.read(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 500 with response when the parameters are not provided", async () => {
      const mockReq = mockRequest({});
      const mockRes = mockResponse();

      await mockNoteService.expects("getNotes").withArgs().rejects();

      await noteController.read(mockReq, mockRes);
      expect(mockRes.status.calledWith(500)).to.be.true;
    });
  });

  describe("Creating Note", () => {
    it("Should return 200 with response when trying to save the note", async () => {
      const mockReq = mockRequest({
        body: testData,
      });
      const mockRes = mockResponse();

      await mockNoteService
        .expects("saveNote")
        .withArgs(testData)
        .resolves(mockData);

      await noteController.create(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 405 when the argument is not correct/ provided", async () => {
      const mockReq = mockRequest({});
      const mockRes = mockResponse();

      await noteController.create(mockReq, mockRes);
      expect(mockRes.status.calledWith(405)).to.be.true;
    });

    it("Should return 500 with response when error", async () => {
      const mockReq = mockRequest({
        body: testData,
      });
      const mockRes = mockResponse();

      await mockNoteService.expects("saveNote").rejects();

      await noteController.create(mockReq, mockRes);
      expect(mockRes.status.calledWith(500)).to.be.true;
    });
  });

  describe("Updating Note", () => {
    it("Should return 200 with response when trying to update the note", async () => {
      const mockReq = mockRequest({
        body: testData,
        params: { _id: idNote },
      });
      const mockRes = mockResponse();

      await mockNoteService
        .expects("modifyNote")
        .withArgs(idNote, testData)
        .resolves(mockData);

      await noteController.update(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 405 with response when trying to update the note", async () => {
      const mockReq = mockRequest({
        params: { _id: idNote },
      });
      const mockRes = mockResponse();

      await noteController.update(mockReq, mockRes);
      expect(mockRes.status.calledWith(405)).to.be.true;
    });
  });

  describe("Getting Note - Based on ID", () => {
    const idNote = "5f831a8ed261d820ac6635ee";
    it("Should return 200 with response when the parameters are provided", async () => {
      const mockReq = mockRequest({
        params: {
          _id: idNote,
        },
      });
      const mockRes = mockResponse();

      await mockNoteService
        .expects("getNote")
        .withArgs({
          _id: idNote,
        })
        .resolves(mockData);

      await noteController.readOne(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 200 with response data not found", async () => {
      const mockReq = mockRequest({
        params: {
          _id: idNote,
        },
      });
      const mockRes = mockResponse();

      mockNoteService
        .expects("getNote")
        .withArgs({
          _id: idNote,
        })
        .resolves({ status: SUCCESS, data: "No data is found!" });

      await noteController.readOne(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 200 with response data not found", async () => {
      const mockReq = mockRequest({
        params: {
          _id: idNote,
        },
      });
      const mockRes = mockResponse();

      mockNoteService
        .expects("getNote")
        .withArgs({
          _id: idNote,
        })
        .resolves({ status: SUCCESS, data: "the data has been deleted" });

      await noteController.readOne(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });
  });

  describe("Deleting Note - Based on ID", () => {
    it("Should return 200 with response data not found", async () => {
      const mockReq = mockRequest({
        params: {
          _id: idNote,
        },
      });
      const mockRes = mockResponse();

      mockNoteService
        .expects("deleteNote")
        .withArgs(idNote)
        .resolves({ status: SUCCESS, data: "Data is not found!" });

      await noteController.delete(mockReq, mockRes);

      expect(mockRes.status.calledWith(200)).to.be.true;
    });

    it("Should return 200 with response data has been deleted", async () => {
      const mockReq = mockRequest({
        params: {
          _id: idNote,
        },
      });
      const mockRes = mockResponse();

      await mockNoteService
        .expects("getNote")
        .withArgs({
          _id: idNote,
        })
        .resolves({ status: SUCCESS, data: "the data has been deleted" });

      await noteController.readOne(mockReq, mockRes);
      expect(mockRes.status.calledWith(200)).to.be.true;
    });
  });
});
