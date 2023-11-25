const express = require("express");
const { authRoute } = require("./auth-route")
const { conselRoute } = require("./conselor-route")
const { quizRoute } = require("./quiz-route")
const { userRoute } = require("./user-route")
const route = express.Router();

route.get("/", (req, res)=> {
    res.json("api incare")
});

route.use("/users", userRoute)
route.use("/auth", authRoute);
route.use("/conselors", conselRoute)
route.use("/quizzes", quizRoute)
route.use("/hasilquizzes", quizRoute)

module.exports = {
    allRouter: route,
}