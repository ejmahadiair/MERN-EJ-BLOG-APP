//external imports
import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import cors from "cors";

//internal imports
import UserRouter from "./routes/user-routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/blog", blogrouter);
app.use(express.static("frontend/build"));

const port = "" || 5000;

//connected to database and server
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.bojze.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(port))
  .then(() =>
    console.log(`Connected to Database and listening to localhost ${port}`)
  )
  .catch((e) => console.log(e));
