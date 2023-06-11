require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
app.use(cookieParser(process.env.MYCOOKIESECERETKEY));
app.use(
  session({
    secret: process.env.MYSESSIONSECERETKEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, //localhost
  })
);
app.use(flash());

const checkUser = (req, res, next) => {
  if (!req.session.isVerified) {
    return res.send("請先登入系統，才能看到秘密。");
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  req.flash("message", "歡迎來到網頁");
  return res.send("這是首頁" + req.flash("message"));
});

app.get("/setCookie", (req, res) => {
  res.cookie("yourCookie", "OREAL", { signed: true });
  return res.send("已設置cookies");
});

app.get("/seeCookie", (req, res) => {
  console.log(req.signedCookies);
  return res.send("看設定好的cookie  " + req.signedCookies.yourCookie);
});

app.get("/setSessionData", (req, res) => {
  req.session.express = "something not important";
  return res.send("在伺服器設置session資料，在瀏覽器設置簽名後的session id");
});

app.get("/seeSessionData", (req, res) => {
  console.log(req.session);
  return res.send("看設定好的session資料" + req.session.express);
});

app.get("/verifyUser", (req, res) => {
  req.session.isVerified = true;
  return res.send("你已經被驗證了。。。");
});

app.get("/secret", checkUser, (req, res) => {
  return res.send("秘密是，柴犬很可愛。。。");
});

app.get("/secret2", checkUser, (req, res) => {
  return res.send("秘密是2，駱駝很可愛。。。");
});

app.listen(3000, () => {
  console.log("正在port3000");
});
