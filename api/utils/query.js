import db from "../config/index.js";

export const queryHandler = (sql, value) => {
    return new Promise((resolve, reject) => {
        db.query(sql, value, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

export const insert = (sql, value) => {
    return new Promise((resolve, reject) => {
        db.query(sql, value, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });
    });
}