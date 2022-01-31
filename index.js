const http = require("http");
const pug = require("pug");
const path = require("path");
const { MongoClient } = require("mongodb");

console.log(pug.renderFile(path.resolve("./public/index.pug")))
