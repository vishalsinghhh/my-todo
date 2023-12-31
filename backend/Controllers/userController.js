const db = require("../Models");
const User = db.users;
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError.BadRequestError("please provide all values");
  }

  const userAlreadyExists = await User.findOne({
    where: {
      email: email,
    },
  });

  if (userAlreadyExists) {
    throw new CustomError.BadRequestError("Email already in use");
  }

  const data = {
    name,
    email,
    password: await bcrypt.hash(password, 10),
  };
  const user = await User.create(data);

  let token = jwt.sign({ id: user.id }, process.env.secretKey, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  let token = jwt.sign({ id: user.id }, process.env.secretKey, {
    expiresIn: 1 * 24 * 60 * 60 * 1000,
  });
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = {
  register,
  login
};
