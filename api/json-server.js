// api/json-server.js
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("public/cities.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;
