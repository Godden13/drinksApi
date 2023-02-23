const express = require("express");
const http = require("http");
const { parse } = require("url");
const {
  getAllUsers,
  createUser,
  getOneUser,
  updateOneUser,
  patchOneUser,
  deleteOneUser,
} = require("./users");
const {
  getAllDrinks,
  createDrink,
  getOneDrink,
  updateOneDrink,
  patchOneDrink,
  deleteOneDrink,
} = require("./drinks");

const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const API_KEYS = ["1", "2", "3", "4"];


app.use(function (req, res, next) {
  const { apiKey } = req.query;
  const key = req.get("x-api-key")
  if(API_KEYS.includes(apiKey) || API_KEYS.includes(key)) {
    next();
  }else {
    res.sendStatus(403)
  }
})

app.get("/users", getAllUsers);
app.post("/users", createUser);
app.get("/users/:id", getOneUser);
app.put("/users/:id", updateOneUser);
app.patch("/users/:id", patchOneUser);
app.delete("/users/:id", deleteOneUser);

app.listen(8080, function() {
  console.log("running on port 8080")
})


// http
//   .createServer(function (req, res) {
//     handleUsersRequest(req, res);
//   })
  
// console.log("Listening on port 8080");

function throw404(res) {
  writeJson(res, { status: "Resource not found" }, 404);
}

function handleUsersRequest(req, res) {
  const { pathname } = parse(req.url);
  const { method } = req;

  if (pathname === "/drinks") {
    if (method === "GET") {
      return getAllDrinks(req, res);
    } else if (method === "POST") {
      return createDrink(req, res);
    }
  } else if (pathname.startsWith('/drinks') && pathname.split("/").length === 3) {
    switch (method.toLowerCase()) {
      case "get":
        return getOneDrink(req, res);
      case "put":
        return updateOneDrink(req, res);
      case "patch":
        return patchOneDrink(req, res);
      case "delete":
        return deleteOneDrink(req, res);
      default:
        break;
    }
  }

  throw404(res);
}
