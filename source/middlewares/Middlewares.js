module.exports = class Middlewares {
  constructor() {}

  //to log the requests
  logRequest(req, res, next) {
    console.info(`${req.method} ${req.originalUrl}`);
    next();
  }
};
