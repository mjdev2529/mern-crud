import { queryHandler } from "../utils/query.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const update = async (req, res, next) => {
  const { user_id, username, email, password, photo } = req.body;
  const dateNow = new Date();
  let sql = "UPDATE user_tbl SET username = ?, email = ?, updatedon = ?";
  let values = [username, email, dateNow];

  if(password){
    const hashedPassword = bcrypt.hashSync(password, 10);
    sql += ", password = ?";
    values.push(hashedPassword);
  }

  if(photo){
    sql += ", img_url = ?";
    values.push(photo);
  }

  sql += " WHERE user_id = ?";
  values.push(user_id);

  try {
    await queryHandler(sql, values);

    try {
      const sql = "SELECT * FROM user_tbl WHERE email = ?";
      const value = [email];
  
      const checkUser = await queryHandler(sql, value);const validUser = JSON.parse(JSON.stringify(checkUser));
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
      next(err);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
