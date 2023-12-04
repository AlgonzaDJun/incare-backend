const express = require("express");
const { registConselor, getConselor, getConselorById, saveSchedule, updateSchedule, addPrice, updatePrice } = require("../controllers/conselor.controller");
const authToken = require("../middlewares/auth");
const route = express.Router();

route.post("/", saveSchedule)
route.post("/asconselor", authToken, registConselor)
route.get("/getconselor", getConselor)
route.get("/:id", getConselorById)
route.put("/price", updatePrice)
route.put("/:id", updateSchedule)
route.post("/price", addPrice)

module.exports = {
  conselRoute: route,
};
