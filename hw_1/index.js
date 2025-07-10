import { createServer } from "./server/server.js";
import { handleRequest } from "./app.js";

const args = process.argv.slice(2);
const portArg = args.find((arg) => arg.startsWith("--port="));
const PORT = portArg ? parseInt(portArg.split("=")[1], 10) : 3000;

const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server was launched succesfully on http://localhost:${PORT}`);
});
