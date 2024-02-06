import { getMany, queryHandler } from "../utils/query.js";
import bcrypt from "bcryptjs";

export const create = async (req, res, next) => {
  const { user_id, username, password, notes, platform } = req.body;
  const dateNow = new Date();
  // const hashedPassword = bcrypt.hashSync(password, 10);

  let sql = "INSERT INTO `credentials_tbl`( `user_id`, `platform`, `username`, `password`, `notes`, `createdon`, `updatedon`) VALUES (?,?,?,?,?,?,?)";
  let values = [user_id, platform, username, password, notes, dateNow, dateNow];

  try {
    await queryHandler(sql, values);
    res
        .status(200)
        .json("Saved successfully!");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const list = async (req, res, next) => {
    const { user_id } = req.body;
  
    let sql = "SELECT * FROM credentials_tbl WHERE user_id = ?";
    let values = [user_id];
  
    try {
      const result = await getMany(sql, values);
      const userData = JSON.parse(JSON.stringify(result));
      res
          .status(200)
          .json(userData);
    } catch (err) {
      console.log(err);
      next(err);
    }
};

export const deleteCredentials = async (req, res, next) => {
  const { credential_id } = req.body;
  const sql = "DELETE FROM credentials_tbl WHERE credential_id = ?";
  const value = [credential_id];

  try {
    await queryHandler(sql, value);
    res.status(200).json("Item successfully deleted.");
  } catch (error) {
    next(error);
  }
}

export const updateCredentials = async (req, res, next) => {
  const { credential_id, platform, username, notes, password } = req.body;
  const dateNow = new Date();
  let sql = "UPDATE credentials_tbl SET platform = ?, username = ?, notes = ?, updatedon = ?";
  let values = [platform, username, notes, dateNow];

  if(password){
    sql += ", password = ?";
    values.push(password);
  }

  sql += " WHERE credential_id = ?";
  values.push(credential_id);

  try {
    await queryHandler(sql, values);

    try {
      const sql = "SELECT * FROM credentials_tbl WHERE credential_id = ?";
      const value = [credential_id];
  
      const checkData = await queryHandler(sql, value);
      const updatedData = JSON.parse(JSON.stringify(checkData));
      // delete updatedData.password;
      res
        .status(200)
        .json(updatedData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}