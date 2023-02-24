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

// Users requests
app.get("/users", getAllUsers);
app.post("/users", createUser);
app.get("/users/:id", getOneUser);
app.put("/users/:id", updateOneUser);
app.patch("/users/:id", patchOneUser);
app.delete("/users/:id", deleteOneUser);

//Drinks Requests

app.get("/drinks", getAllDrinks);
app.post("/drinks", createDrink);
app.get("/drinks/:id", getOneDrink);
app.put("/drinks/:id", updateOneDrink);
app.patch("/drinks/:id", patchOneDrink);
app.delete("/drinks/:id", deleteOneDrink);

app.listen(8080, function() {
  console.log("running on port 8080")
});
