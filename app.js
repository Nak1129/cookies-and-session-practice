const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("這是首頁");
});

app.get("/setCookie", (req, res) => {
  res.cookie("yourCookie", "OREAL");
  return res.send("已設置cookies");
});

app.get("/seeCookie", (req, res) => {
  console.log(req.cookies);
  return res.send("看設定好的cookie");
});

app.listen(3000, () => {
  console.log("正在port3000");
});
