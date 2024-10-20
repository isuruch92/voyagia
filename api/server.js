import jsonServer from "json-server";
import * as fs from "fs";
import * as path from "path";

const server = jsonServer.create();

// Uncomment to allow write operations
const filePath = path.join("cities.json");
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

// Comment out to allow write operations
// const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/blog/:resource/:id/show": "/:resource/:id",
  })
);
server.use(router);
server.listen(8000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
export default server;
