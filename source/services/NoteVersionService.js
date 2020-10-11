const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
  sendResponse,
} = require("../controller/NoteController/NoteConstants");

module.exports = class NoteVersionService {
  constructor(dependencies) {
    this.noteVersionRepository = dependencies.noteVersionRepository;
  }

  async getNotes() {
    try {
      const data = await this.noteVersionRepository.find();
      if (data.length === 0) {
        return { status: SUCCESS, data: "No data is found!" };
      }
      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async getNote(_id) {
    try {
      const data = await this.noteVersionRepository.find({
        noteRefference: _id,
      });
      if (data.length === 0) {
        return { status: SUCCESS, data: "No data is found!" };
      }
      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }
};
