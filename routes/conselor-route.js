const express = require("express");
const {
  registConselor,
  getConselor,
  getConselorById,
  saveSchedule,
  updateSchedule,
  addPrice,
  updatePrice,
  deleteSchedule,
} = require("../controllers/conselor.controller");
const route = express.Router();

route.post("/asconselor", registConselor);
route.post("/:id", saveSchedule);
route.get("/getconselor", getConselor);
route.get("/:id", getConselorById);
route.put("/price", updatePrice);
route.put("/:id", updateSchedule);
route.post("/price", addPrice);
route.delete("/:userId/schedule/:id", deleteSchedule);

module.exports = {
  conselRoute: route,
};
