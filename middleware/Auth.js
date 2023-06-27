const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const secret = process.env.SECRET_KEY;
const { user } = require("../models");

const verifyUser = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token === null) return res.status(403).json({ msg: "Unauthorized request" });

  const splitToken = token.split(" ")[1];
  let verifiedUser = jwt.verify(splitToken, secret);
  if (!verifiedUser) return res.status(403).json({ msg: "Access denied" });
  req.user = verifiedUser;
  next();
});

const isAdmin = catchAsync(async (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ msg: "Access denied" });
  }
});

const isUser = catchAsync(async (req, res, next) => {
  if (req.user.role === "user") {
    next();
  } else {
    return res.status(403).json({ msg: "Access denied" });
  }
});

const isGuest = catchAsync(async (req, res, next) => {
  if (req.user.role === "guest") {
    next();
  } else {
    return res.status(403).json({ msg: "Access denied" });
  }
});

const isVerifyAccount = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const userAccount = await user.findByPk(id);

  if (!userAccount) {
    return res.status(404).json({ message: "Account not found" });
  }

  if (userAccount.verify === false) {
    next();
  } else {
    return res.status(400).json({ msg: err.message });
  }
});

module.exports = { verifyUser, isAdmin, isUser, isGuest, isVerifyAccount };
