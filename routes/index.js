const express = require("express");

const speakersRouter = require("./speakers");
const feedbackRouter = require("./feedback");

const router = express.Router();

module.exports = (params) => {
  router.get("/", (request, response) => {
    response.render("pages/index", { pageTitle: "Home" });
  });

  router.use("/speakers", speakersRouter(params));
  router.use("/feedback", feedbackRouter(params));

  return router;
};
