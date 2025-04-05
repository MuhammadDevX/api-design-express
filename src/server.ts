import express from "express";
import router from "./router.js";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth.js";
import { createNewUser, signin } from "./handlers/user.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const customLogger = (message) => (req, res, next) => {
  console.log(`hello from ${message}`);
  next();
};

app.use(customLogger("customer logger"));

app.get("/", (req, res, next) => {
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops that is on us" });
  }
});

process.on("uncaughtException", () => {
  console.log("Error was uncaught");
});

export default app;
