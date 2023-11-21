const express = require("express");
const { authRoute } = require("./auth-route")
const { conselRoute } = require("./conselor-route")
const route = express.Router();

route.get("/", (req, res)=> {
    res.json("api incare")
});

route.use("/auth", authRoute);
route.use("/conselors", conselRoute)

module.exports = {
    allRouter: route,
}