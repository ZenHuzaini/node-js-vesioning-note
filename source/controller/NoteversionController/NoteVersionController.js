const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
  sendResponse,
} = require("./../NoteController/NoteConstants");

module.exports = class NoteVersionController {
  constructor(dependencies) {
    this.noteVersionService = dependencies.noteVersionService;

    this.checkVersions = this.checkVersions.bind(this);
    this.checkVersion = this.checkVersion.bind(this);
  }

  async checkVersions(req, res) {
    try {
      const data = await this.noteVersionService.getNotes();
      console.log("something");
      sendResponse(res, data);
    } catch (error) {
      console.log(error);
      sendResponse(res, { status: ERROR });
    }
  }

  async checkVersion(req, res) {
    const { _id } = req.params;
    try {
      const data = await this.noteVersionService.getNote(_id);
      console.log("something");
      sendResponse(res, data);
    } catch (error) {
      console.log(error);
      sendResponse(res, { status: ERROR });
    }
  }
};
