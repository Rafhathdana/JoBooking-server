import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, password, phone, country, city, img, isAdmin } =
      req.body;
    console.log(JSON.stringify(req.body));
    // Check if username or email already exists
    const usernameCheck = await User.findOne({ username: username });
    const emailCheck = await User.findOne({ email: email });

    if (usernameCheck) {
      return next(createError(400, "Username already in use"));
    }
    if (emailCheck) {
      return next(createError(400, "Email already in use"));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username: username,
      email: email,
      phone: phone,
      imageUrl: img,
      country: country,
      city: city,
      password: hashedPassword,
      isAdmin: isAdmin ? true : false,
      isBlocked: false,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Find the user by username
    let user;
    if (username) user = await User.findOne({ username: username });
    else if (email) user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Check if the provided password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong Password or username"));
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // Send the token as a cookie and user details in the response
    const { password: _, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const handleLogout = async (req, res) => {
  // Clear the access_token cookie to log out the user
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successful" });
};
