const Server = require("../../server");
const { prepareServer } = new Server();
const expect = require("chai").expect;
const sinon = require("sinon");
const request = require("supertest");

const {
  SUCCESS,
  REQUIRED_ARGUMENT_NOT_PROVIDED,
  ERROR,
} = require("../../source/controller/NoteController/NoteConstants");

describe("Note Integartion Test Flow", function () {
  let server;
  let getServer;
  let requestAgent;

  before(async () => {
    getServer = await prepareServer();
    server = getServer.listen();
    requestAgent = request.agent(server);
  });

  after(() => {
    server.close();
  });

  describe("Getting Notes", () => {
    it("Should response success with status code and real result when tring to get the note", async () => {
      const response = await requestAgent
        .get("/api/note")
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response success with status code and information if array of note is empty", async () => {
      const response = await requestAgent
        .get("/api/note")
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });
  });

  describe("Getting Notes - Based on ID", () => {
    it("Should response success with status code and real result when tring to get the note with proper argument", async () => {
      const response = await requestAgent
        .get("/api/note")
        .query({
          _id: "5f831a8ed261d820ac6635ee",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });
  });
});
