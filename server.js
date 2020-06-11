const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");

const FeedbackService = require("./services/FeedbackService");
const SpeakersService = require("./services/SpeakerService");

const feedbackService = new FeedbackService("./data/feedback.json");
const speakersService = new SpeakersService("./data/speakers.json");

const app = express();

const routes = require("./routes");

const port = 3000;

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["sdgshs", "shdgasd"],
  })
);

app.set("View Engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, "./static")));

app.use(async (request, response, next) => {
  const names = await speakersService.getNames();
  response.locals.speakerNames = names;
  return next();
});

app.use(
  "/",
  routes({
    feedbackService,
    speakersService,
  })
);

app.listen(port, () => {
  console.log(`Express is listening at ${port}`);
});
