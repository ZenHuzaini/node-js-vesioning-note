const Server = require("./server");
const { startServer } = new Server();

async function run() {
  await startServer(process.env.PORT);
  console.log("server started");
}

run();
