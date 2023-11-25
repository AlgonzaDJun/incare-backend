const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongo = require("./config/mongo");
const { allRouter } = require("./routes");
config();

const PORT = process.env.PORT;

const app = express();
mongo
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch(() => {
    console.log("Mongodb not connected");
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(allRouter);
app.listen(PORT, () => {
  console.log(`Server is running in localhost:${PORT}`);
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});
