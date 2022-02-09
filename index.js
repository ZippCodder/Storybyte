require("dotenv").config();
const http = require("http");
const path = require("path");
const url = require("url");
const fs = require("fs");
const MODE = (process.env.MODE) ? process.env.MODE:process.env.MODE = "development";
const PORT = (process.env.PORT) ? process.env.PORT:process.env.PORT = 5000;
const URL = (process.env.URL) ? process.env.URL: process.env.URL = `http://localhost:${PORT}/`;
const { _ROUTES, send } = require("./router.js");
const util = require("util");
const debug = util.debuglog("SERVER");

const server = http.createServer(handleRequest);

async function handleRequest(req,res) {
const request = {
path: req.url.split("?")[0],
method: req.method,
headers: req.headers,
file: path.basename(req.url.split("?")[0]),
query: {}
}

let body = "";
let query = new URLSearchParams(req.url.split("?")[1]);
let err = false;

request.query = Object.fromEntries(query);

if (req.method === "POST") {
for await (let d of req) {
body += d.toString();
}
try {
request.body = Object.fromEntries(new URLSearchParams(body));
} catch {
err = true;
}
}

if (!err) {
debug(request);
routeRequest(request,res);
} else {
send(request,res,false,false,400);
}
}

function routeRequest(req,res) {
let route = (_ROUTES[req.path]) ? _ROUTES[req.path]:_ROUTES["404"];
let ext = path.extname(req.file).slice(1);
switch (ext) {
case "js": route = _ROUTES["scripts"];
break;
case "png": route = _ROUTES["images"];
break;
case "svg": route = _ROUTES["images"];
break;
case "jpg": route = _ROUTES["images"];
break;
case "jpeg": route = _ROUTES["images"];
break;
case ".css": rooute = _ROUTES["styles"];
break;
}
req.ext = ext;
route(req,res);
}

server.listen(PORT,() => {
console.log("\x1b[32m%s\x1b[0m",`Server is active in ${MODE} mode...`)
});

module.exports.PORT = PORT;
module.exports.URL = URL;
