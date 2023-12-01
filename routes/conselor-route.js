const express = require("express");
const { registConselor, getConselor, getConselorById, saveSchedule, updateSchedule } = require("../controllers/conselor.controller");
const authToken = require("../middlewares/auth");
const route = express.Router();

route.post("/asconselor", registConselor)
route.get("/getconselor", getConselor)
route.get("/:id", getConselorById)
route.post("/", saveSchedule)
route.put("/:id", updateSchedule)

module.exports = {
  conselRoute: route,
};
