const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./Routes/auth");
const cookieParser = require("cookie-parser");
const RecipeRouter = require('./Routes/reciper');


const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods:["GET" ,"POST"],
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use("/auth", userRouter);
app.use('/rcipe' , RecipeRouter)
mongoose.connect("mongodb://127.0.0.1:27017/recipeapp");

app.listen(3001, () => {
  console.log("server work ! ");
});
