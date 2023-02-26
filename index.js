const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const userRouter = require("./routes/userRoutes");
const drinksRouter = require("./routes/drinksRoutes");

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

app.use("/users", userRouter);
app.use("/drinks", drinksRouter);

app.listen(3000);
