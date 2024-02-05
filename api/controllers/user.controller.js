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
  
      const checkUser = await queryHandler(sql, value);
      const validUser = JSON.parse(JSON.stringify(checkUser));
      res
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

export const deleteUser = async (req, res, next) => {
  const { user_id } = req.body;
  const sql = "DELETE FROM user_tbl WHERE user_id = ?";
  const value = [user_id];

  try {
    await queryHandler(sql, value);
    res.status(200).json("Account successfully deleted.");
  } catch (error) {
    next(error);
  }
}