const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
config();
const app = express();
const PORT = process.env.PORT;
const db = require("./config/mongo");
const allRoutes = require("./routes");

db.then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.log("MongoDB Error", err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(allRoutes)


app.listen(PORT, () => {
  console.log(`Server is running in localhost:${PORT}`);
});
