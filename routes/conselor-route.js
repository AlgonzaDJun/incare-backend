const express = require("express");
const { registConselor, getConselor, getConselorById } = require("../controllers/conselor.controller");
const authToken = require("../middlewares/auth");
const route = express.Router()

route.post("/asconselor", authToken, registConselor)
route.get("/getconselor", getConselor)
route.get("/:id", getConselorById)

module.exports = {
    conselRoute: route,
}