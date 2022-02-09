const { renderFile } = require("pug");
const util = require("util");
const debug = util.debuglog("ROUTER");
const path = require("path"); 
const { MongoClient } = require("mongodb");
const ReactDOMServer = require("react-dom/server");
const Home = require("./dist/ssr/home.bundle.js").default;
const Signup = require("./dist/ssr/signup.bundle.js").default;
const Signin = require("./dist/ssr/signin.bundle.js").default;
const React = require("react");
const crypto = require("crypto");
const fs = require("fs");
const { URL, PORT } = process.env;
const client = new MongoClient(process.env.MONGO_URI);

const _ROUTES = {
"/": _home,
"/signup": _signUp,
"/signin": _signIn,
"/users": _users,
"404": _notFound,
"images": images,
"scripts": scripts,
"styles": styles
}

// pages...

function _notFound(req,res) {
send(req,res,JSON.stringify({status: 404, message: "The requested resourse couldn't be found!"}),"application/json",404);
}

//  VARIABLES: title, desc, canonical, script, base

function _home(req,res) {
const markup = ReactDOMServer.renderToString(React.createElement(Home, null));
const style = fs.readFileSync(__dirname+"/dist/home.css","utf-8");

let file = renderFile(path.resolve("./public/index.pug"),{title: "Storybyte", desc: "A platform from creative writers to compose interactive stories by building a tree of potencial options a reader can take within a story.", canonical: URL, base: URL, script: "/home.bundle.js", style: style, render: markup});
send(req,res,file,"text/html");
}

function _signIn(req,res) {
const markup = ReactDOMServer.renderToString(React.createElement(Signin, null));
const style = fs.readFileSync(__dirname+"/dist/signin.css","utf-8");

let file = renderFile(path.resolve("./public/index.pug"),{title: "Storybyte | Sign In", desc: "Sign into Storybyte to browse thousands of stories of many different genres from horror to comedy and everything in between.", canonical: URL, base: URL, script: "/signin.bundle.js", style: style, render: markup});
send(req,res,file,"text/html");
}

function _signUp(req,res) {
const markup = ReactDOMServer.renderToString(React.createElement(Signup, null));
const style = fs.readFileSync(__dirname+"/dist/signup.css","utf-8");

let file = renderFile(path.resolve("./public/index.pug"),{title: "Storybyte | Sign Up", desc: "Get started with Storybyte and create an account today to start creating your own interactive stories.", canonical: URL, base: URL, script: "/signup.bundle.js", style: style, render: markup});
send(req,res,file,"text/html");
}

// scripts...

function scripts(req,res) {
fs.readFile(`dist/${req.file}`,"utf-8",(err,data) => {
if (!err) {
send(req,res,data.replace("//!",""),"text/javascript",200);
} else {
send(req,res,false,false,500);
}
});
}

// styles...

function styles(req,res) {
const style = fs.createReadStream(path.resolve(`./dist/${req.file}`));
style.on("open",() => {
res.statusCode = 200;
res.setHeader("Content-Type","text/css");
style.pipe(res);
});

style.on("error",(err) => {
 send(req,res,false,false,500);
});
}

// user operations...

function _users(req,res) {
	if (req.method === "POST") {
// create user...

let {username, password, password_re} = req.body;
      
      username = (typeof username === "string") ? username:false;
      password = (typeof password === "string") ? password:false;

	if (username && password) {
          client.connect((err) => {
	    if (!err) {
           const users = client.db("Storybyte").collection("users");
		   password = crypto.createHmac("sha256",process.env.HASH_SECRET).update(password).digest("hex");
            users.insertOne({username: username, password: password}).then(usrObj => {
               if (usrObj.insertedId) {
               send(req,res,JSON.stringify({status: 200, message: "User was successfully created!"}),"application/json",200);
	        client.close();
	       } else {
            send(req,res,JSON.stringify({status: 500, message: "An error ocurred while creating user!"}),"application/json",500);
		client.close();
	       }
	    });
	    } else {
           send(req,res,JSON.stringify({status: 500, message: "An error ocurred while creating user!"}),"application/json",500);
	    }
	  });
	} else {
         send(req,res,JSON.stringify({status: 400, message: "Invalid or missing request parameters!"}),"application/json",400);
	}
	} else if (req.method === "GET") {
// check for taken usernames...

          let { username } = req.query;
         username = (typeof username === "string") ? username:false;
            
	    if (username) {
            client.connect(err => {
	       if (!err) {
        const users = client.db("Storybyte").collection("users");
	     users.find({username: username}).toArray().then(data => {
		     if (data.length === 0) {
	        send(req,res,JSON.stringify({status: 200, message: "That username is avaliable!"}));
	        client.close();
                  } else {
               send(req,res,JSON.stringify({status: 500, message: "A user with that username already exists!"}),"application/json",500);
              client.close();
		  }
	     }).catch(err => {
	        send(req,res,JSON.stringify({status: 500, message: "An error ocurred looking up the user."}),"application/json",500);
		     client.close();
	     });
	       } else {
		       console.log(err);
              send(req,res,JSON.stringify({status: 500, message: "An error ocurred looking up the user."}),"application/json",500);
	       }
	    });
	    } else {
         send(req,res,JSON.stringify({status: 400, message: "invalid request parameters."}),"application/json",400);
	    }
	}
}

// images...

function images(req,res) {
const img = (req.file === "favicon.png") ? "./public/images/favicon.png":`./dist/${req.file}`;

   fs.readFile(img,(err,data) => {
     if (!err && data) {
       send(req,res,data,true);
     } else {
     send(req,res,false,false,500);
     }
   });
}

// Utility functions...

function send(req,res,data, contentType, status = 200, headers = {}) {
// infer file types...
	if (contentType === true) {
  switch(req.ext) {
   case "js": contentType = "text/javascript";
   break;
   case "html": contentType = "text/html";
   break;
   case "json": contentType = "application/json";
   break;
   case "svg": contentType = "image/svg+xml";
   break;
   case "png": contentType = "image/png";
   break;
   case "jpg": contentType = "image/jpg";
   break;
   case "jpeg": contentType = "image/jpeg";
   break;
  }
	}
res.writeHead(status, Object.assign(headers,{"Content-Type": contentType || "text/plain"}));

console.log({_request: req, _response: {status: status, headers: headers}});
console.log("\n");
if (data) res.write(data);
res.end();
}

module.exports._ROUTES = _ROUTES;
module.exports.send = send;
