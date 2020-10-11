require("dotenv").config();
const express = require("express");
const Container = require("./container");
const { buildContainer } = new Container();
const { startControllers } = require("./startController");

const Middlewares = require("./source/middlewares/Middlewares");
const { logRequest } = new Middlewares();

module.exports = class Server {
  constructor() {
    this.app = express();
    this.appRouter = express.Router();
    this.container = buildContainer();
    this.prepareServer = this.prepareServer.bind(this);
    this.startServer = this.startServer.bind(this);
    this.applyMiddleware = this.applyMiddleware.bind(this);
  }

  async prepareServer() {
    this.applyMiddleware(this.app, this.appRouter);
    startControllers(this.appRouter, this.container);

    return this.app;
  }

  async startServer(port = 1996) {
    const server = await this.prepareServer();

    console.log("server is trying to run in port ", port);
    return server.listen(port).on("error", (e) => {
      console.log(`Server cannot be started because of ${e}`);
    });
  }

  applyMiddleware(app, router) {
    app.use(logRequest);
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: "10mb", extended: true }));
    app.use("/api", router);
  }
};
