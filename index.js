const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const cookieName = "Authorization";

app.use(cookieParser());
app.get("/login", (req, res) => {
  res.cookie(cookieName, "LoggedIn", {
    httpOnly: true,
    signed: false,
    secure: false,
  });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.clearCookie(cookieName);
  res.redirect("/");
});

app.get("/cookie", (req, res) => {
  console.log(req.cookies[cookieName]);
  if (req.cookies[cookieName] === "LoggedIn") {
    console.log("sending file");
    res.sendFile("cookie.png", {
      root: path.join(__dirname, "public"),
    });
  } else {
    res.sendStatus("404");
  }
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
