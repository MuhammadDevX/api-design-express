import * as dotenv from "dotenv";
dotenv.config();
import app from "./server.js";
import config from "./config/index.js";

app.listen(config.port, (req, res) => {
  console.log(`hello on http://localhost:${config.port}`);
});
