const http = require("http");
const pug = require("pug");
const path = require("path");

console.log(pug.renderFile(path.resolve("./public/index.pug")))
