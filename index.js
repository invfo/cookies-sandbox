const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const cookieName = "Authorization";
const loggedIn = "LoggedIn";

app.use(cors());
app.use(cookieParser());
app.get("/login", (req, res) => {
  res.cookie(cookieName, loggedIn, {
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

const corsOptions = {
  origin: [
    "https://cookies-cross-origin.herokuapp.com",
    "https://test-cookie-transfer.bubbleapps.io",
  ],
  credentials: true,
};

app.get("/whoami", cors(corsOptions), (req, res) => {
  if (req.cookies[cookieName] === loggedIn) {
    res.json({ res: "authenticated" });
  } else {
    res.json({ res: "not authenticated" });
  }
});

app.get("/cookie", (req, res) => {
  if (req.cookies[cookieName] === loggedIn) {
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
