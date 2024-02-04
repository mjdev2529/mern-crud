import bcrypt from "bcryptjs";
import { insert, queryHandler } from "../utils/query.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const stockImgURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const dateNow = new Date();
  const sql =
    "INSERT INTO user_tbl (username, email, password, role, img_url, createdon, updatedon) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    username,
    email,
    hashedPassword,
    0,
    stockImgURL,
    dateNow,
    dateNow,
  ];

  try {
    await insert(sql, values);
    res.status(201).send({ message: "Success: A new user was added." });
  } catch (err) {
    console.log(err);
    if (err.code == "ER_DUP_ENTRY") {
      return res.status(200).json({
        success: false,
        message:
          "An account already exists. Please use another Email or Username.",
      });
    } else {
      next(err);
    }
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user_tbl WHERE email = ?";
  const value = [email];

  try {
    const result = await queryHandler(sql, value);
    if (result.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid credentials" });
    }
    console.log("res: ", result);

    const validUser = result;
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword)
      return res
        .status(200)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: validUser.user_id }, process.env.JWT_SECRET);
    delete validUser.password;
    const exp = new Date(Date.now() + 3600000); // Set expiry date to 1 hour from now
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: exp,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json(validUser);

  } catch (err) {
    console.log(err);
    return res
      .status(200)
      .json({ success: false, message: "Invalid credentials" });
  }
};

export const google = async (req, res) => {
  const { name, email, photo } = req.body;
  const sql = "SELECT * FROM user_tbl WHERE email = ?";
  const value = [email];

  const checkUser = await queryHandler(sql, value);
  if (checkUser === undefined) {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

    const dateNow = new Date();
    const sql =
      "INSERT INTO user_tbl (username, email, password, role, img_url, createdon, updatedon) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const newName =
      name.split(" ").join("").toLowerCase() +
      Math.floor(Math.random() * 10000).toString();
    const values = [newName, email, hashedPassword, 0, photo, dateNow, dateNow];
    const insertedId = await insert(sql, values);

    if (insertedId !== undefined) {
      const sql = "SELECT * FROM user_tbl WHERE user_id = ?";
      const value = [insertedId];

      const userData = await queryHandler(sql, value);
      const newUser = JSON.parse(JSON.stringify(userData));

      const token = jwt.sign({ id: newUser.user_id }, process.env.JWT_SECRET);
      delete newUser.password;
      const exp = new Date(Date.now() + 3600000); // Set expiry date to 1 hour from now
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: exp,
          sameSite: "lax",
          secure: false,
        })
        .status(200)
        .json(newUser);
    }
  } else {
    const validUser = JSON.parse(JSON.stringify(checkUser));
    const token = jwt.sign({ id: validUser.user_id }, process.env.JWT_SECRET);
    delete validUser.password;
    const exp = new Date(Date.now() + 3600000); // Set expiry date to 1 hour from now
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: exp,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json(validUser);
  }
};
