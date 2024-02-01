// import User from "../models/user.model.js";
import db from "../config/index.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  // const newUser = new User({ username, email, password: hashedPassword });

  // try {
  //     await newUser.save();
  //     res.status(201).json({message: "Success: A new user was added."});
  // } catch (error) {
  //     next(error);
  // }
  const dateNow = new Date();
  const sql =
    "INSERT INTO user_tbl (username, email, password, role, createdon, updatedon) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [username, email, hashedPassword, 0, dateNow, dateNow];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.status(201).send({ message: "Success: A new user was added." });
    }
  });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user_tbl WHERE email = ?";
  const value = [email];

  db.query(sql, value, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      if (result.length === 0) {
        return next(errorHandler(401, "Invalid credentials"));
      }
      const validUser = result[0];
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, "Invalid credentials"));
      const token = jwt.sign({ id: validUser.user_id }, process.env.JWT_SECRET);
      delete validUser.password;
      const exp = new Date(Date.now() + 3600000); // Set expiry date to 1 hour from now
      res.cookie("access_token", token, {
          httpOnly: true,
          expires: exp,
          sameSite: "lax",
          secure: false,
        })
        .status(200)
        .json(validUser);
    }
  });
};
