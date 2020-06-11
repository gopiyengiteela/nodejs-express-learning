const express = require("express");

const speakersRouter = require("./speakers");
const feedbackRouter = require("./feedback");

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get("/", async (request, response) => {
    const artwork = await speakersService.getAllArtwork();
    const topSpeakers = await speakersService.getList();
    response.render("layout", {
      pageTitle: "Welcome",
      template: "index",
      topSpeakers,
      artwork,
    });
  });

  router.use("/speakers", speakersRouter(params));
  router.use("/feedback", feedbackRouter(params));

  return router;
};
