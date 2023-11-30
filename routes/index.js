const express = require("express");
const { authRoute } = require("./auth-route");
const { conselRoute } = require("./conselor-route");
const { quizRoute } = require("./quiz-route");
const { userRoute } = require("./user-route");
const { bookingRouter } = require("./booking.route");
const { reviewRouter } = require("./review.route");
const { paymentRouter } = require("./payment.route");
const { chatRoute } = require("./chat-route");
const faqRoute = require("./faq");
const seminarRoute = require("./seminar");
const storyRoute = require("./story");
const authToken = require("../middlewares/auth");

const route = express.Router();

route.get("/", (req, res) => {
  res.json("api incare");
});
route.use("/faqs", faqRoute);
route.use("/seminars", seminarRoute);
route.use("/stories", storyRoute);
route.use("/users", userRoute);
route.use("/auth", authRoute);
route.use("/conselors", conselRoute);
route.use("/quizzes", quizRoute);
route.use("/hasilquizzes", quizRoute);
route.use("/booking", bookingRouter);
route.use("/review", reviewRouter);
route.use("/chats", chatRoute);

route.use("/payment", paymentRouter )

module.exports = {
  allRouter: route,
};
