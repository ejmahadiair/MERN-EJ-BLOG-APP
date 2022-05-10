import User from "../models/User";
import bcrypt from "bcrypt";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (e) {
    return console.log(e);
  }
  if (!users) {
    return res.status(404).json({ message: "No user Found" });
  }
  return res.status(200).json({ users });
};

// add new user / sign up
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return console.log(e);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instad" });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashPassword,
    blogs: [],
  });

  try {
    await newUser.save();
  } catch (e) {
    return console.log(e);
  }
  return res.status(201).json({ newUser });
};

//login functionality

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return console.log(e);
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Could not find User By this Email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login Successfull", user: existingUser });
};
