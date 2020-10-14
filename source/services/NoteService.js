const {
  SUCCESS,
  ERROR,
  NO_DATA,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
  sendResponse,
} = require("../controller/NoteController/NoteConstants");

const { removeDeletedAttr } = require("./helper/Helper");

module.exports = class NoteService {
  constructor(dependencies) {
    this.noteRepository = dependencies.noteRepository;
    this.noteVersionRepository = dependencies.noteVersionRepository;
  }

  async getNotes() {
    try {
      var data = await this.noteRepository.find();
      if (data.length === 0) {
        return { status: SUCCESS, data: "No data is found!" };
      }

      const filteredData = data.filter((element) => !element.deleted);
      const result = removeDeletedAttr(filteredData);
      return { status: SUCCESS, data: result };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async getNote(_id) {
    try {
      const data = await this.noteRepository.find({ _id });
      if (data.length === 0) {
        return { status: SUCCESS, data: "No data is found!" };
      } else if (data[0].deleted) {
        return { status: ERROR, data: "the data has been deleted" };
      }

      const result = removeDeletedAttr(data);
      return { status: SUCCESS, data: result };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async getDeletedNote() {
    try {
      const data = await this.noteRepository.find({ deleted: true });
      if (data.length === 0) {
        return { status: SUCCESS, data: "No data is found!" };
      }

      const result = removeDeletedAttr(data);
      return { status: SUCCESS, data: result };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async saveNote(params) {
    try {
      const data = await this.noteRepository.add(params);
      //save version
      await this.noteVersionRepository.add({
        noteRefference: data._id,
        data: [{ ...params }],
      });

      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async modifyNote(_id, body) {
    try {
      //check if the id exists
      const doesExist = await this.noteRepository.find({ _id });
      if (doesExist.length === 0) {
        return { status: SUCCESS, data: "No data is found!" };
      } else if (doesExist[0].deleted) {
        return {
          status: ERROR,
          data: "Cannot update :( the data has been deleted!",
        };
      }

      const data = await this.noteRepository.updateById(_id, body);

      //save data version
      const dataVersion = await this.noteVersionRepository.find({
        noteRefference: _id,
      });

      await this.noteVersionRepository.updateById(
        { _id: dataVersion[0]._id },
        {
          $push: {
            data: {
              ...body,
              version: parseInt(dataVersion[0].data.length),
            },
          },
        }
      );

      return { status: SUCCESS, data };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }

  async deleteNote(id) {
    try {
      const data = await this.noteRepository.updateById(
        { _id: id },
        {
          deleted: true,
        }
      );
      return {
        status: SUCCESS,
        data:
          data === null ? "Data is not found!" : "the note has been removed!",
      };
    } catch (error) {
      console.log(error);
      return { status: ERROR };
    }
  }
};
