const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const faqRoute = require("./routes/faq");
const seminarRoute = require("./routes/seminar");
config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use("/faq", faqRoute);
app.use("/seminar", seminarRoute);
app.listen(PORT, () => {
  console.log(`Server is running in localhost:${PORT}`);
});
