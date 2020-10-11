const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
  sendResponse,
} = require("./NoteConstants");

class NoteController {
  constructor(dependencies) {
    this.noteService = dependencies.noteService;
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async read(req, res) {
    try {
      const data = await this.noteService.getNotes();

      sendResponse(res, data);
    } catch (error) {
      console.log(error);
      sendResponse(res, { status: ERROR });
    }
  }
  async create(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
      return sendResponse(res, { status: REQUIRED_ARGUMENT_NOT_PROVIDED });
    }
    try {
      console.log("something");

      const data = await this.noteService.saveNote(req.body);
      console.log("get data from contrller ", data);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async readOne(req, res) {
    const { _id } = req.params;
    console.log("get the id ", REQUIRED_ARGUMENT_NOT_PROVIDED);
    try {
      const data = await this.noteService.getNote({ _id });
      console.log("et one data from controller ", data);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async update(req, res) {
    const { _id } = req.params;
    const { title, content } = req.body;
    if (!_id || !title || !content) {
      return sendResponse(res, { status: REQUIRED_ARGUMENT_NOT_PROVIDED });
    }
    const data = await this.noteService.modifyNote(_id, req.body);
    sendResponse(res, data);
    try {
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async delete(req, res) {
    const { _id } = req.params;
    console.log("get the id ", _id);
    try {
      const data = await this.noteService.deleteNote(_id);
      console.log("et one data from controller ", data);
      sendResponse(res, data);
    } catch (error) {
      console.error(error);
      sendResponse(res, { status: ERROR });
    }
  }
}

module.exports = NoteController;
