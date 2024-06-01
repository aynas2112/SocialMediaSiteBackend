import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello to Social Media Site Backend");
});

app.use("/chats",chatRoutes);

app.listen(PORT, () => 
    console.log(`Server up and running on port: ${PORT}`)
);

// mongoose.set('useFindAndModify', false);
