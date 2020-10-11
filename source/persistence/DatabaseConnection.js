const mongoose = require("mongoose");
let isConnected = false;

module.exports = class DatabaseConnection {
  constructor() {
    this.connect = this.connect.bind(this);
    this.createModel = this.createModel.bind(this);
  }

  connect() {
    if (!isConnected) {
      mongoose.connection.on("connected", () =>
        console.log("connected to database")
      );

      mongoose.connection.on("reconnected", () =>
        console.log("reconnecting database")
      );

      mongoose.connect(process.env.MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });

      isConnected = true;
    }

    return isConnected;
  }

  createModel(name, schema) {
    this.connect();
    return mongoose.model(name, schema);
  }
};
