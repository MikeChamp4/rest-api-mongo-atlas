const express = require("express");
const multipart = require("connect-multiparty");
const userCtrl = require("../controllers/user.controller");

// Middlewares //
const mdAuth = require("../middlewares/authenticated.middleware");
const mdUploadAvatar = multipart({ uploadDir: "./uploads" });

const api = express.Router();

// Endpoints //
api.post("/register", userCtrl.registerUser);
api.post("/login", userCtrl.loginUser);

api.get("/protected", [mdAuth.ensureAuth], userCtrl.protected);
api.get("/avatar/:avatarName", userCtrl.getAvatar);

api.put("/upload-avatar/:id", [mdAuth.ensureAuth, mdUploadAvatar], userCtrl.uploadAvatar);

module.exports = api;
