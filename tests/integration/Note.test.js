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

    it.skip("Should response Error, if the service is unable to perform the operation", async () => {
      const response = await requestAgent.get("/api/note").abort();

      // expect(response.statusCode).to.equal(405);
      expect(response.text.includes(ERROR)).to.be.true;
    });
  });

  describe.only("Getting Notes - Based on ID", () => {
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

    it.skip("Should response to provide required arguments. Returning status code and note is not found", async () => {
      const response = await requestAgent
        .get("/api/note")
        .query({ _id: "5f831a8ed261d820ac6safe635io" })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text).to.equal({
        status: SUCCESS,
        data: "No data is found!",
      });
    });
  });

  describe.skip("Getting all Books - Based on the type", () => {
    it("Should response success with status code and real result when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/books")
        .send({
          type: "hardcover-fiction",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response to provide required arguments. Returning status code and warning result when tring to get the article without proper argument", async () => {
      const response = await requestAgent
        .get("/api/books")
        .send()
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(405);
    });
  });

  describe.skip("Getting all Books - Based on the type and query", () => {
    it("Should response success with status code and real result when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/book")
        .send({
          type: "hardcover-fiction",
          searchQuery: "woman",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response success with status code and result no data found when tring to get the article with proper argument", async () => {
      const response = await requestAgent
        .get("/api/book")
        .send({
          type: "hardcover-fiction",
          searchQuery: "fj",
        })
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(200);
      expect(response.text.includes(SUCCESS)).to.be.true;
    });

    it("Should response to provide required arguments. Returning status code and warning result when tring to get the article without proper argument", async () => {
      const response = await requestAgent
        .get("/api/book")
        .send()
        .set("Accept", "application/json");

      expect(response.statusCode).to.equal(405);
    });
  });
});
