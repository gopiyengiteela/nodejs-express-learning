const express = require("express");
const path = require("path");

const app = express();

const port = 3000;

app.set("View Engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname, "./static")));

app.get("/", (request, response) => {
  response.render("pages/index", { pageTitle: "Home" });
});

app.get("/speakers", (request, response) => {
  response.sendFile(path.join(__dirname, "./static/speakers.html"));
});

app.listen(port, () => {
  console.log(`Express is listening at ${port}`);
});