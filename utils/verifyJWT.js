import jwt from "jsonwebtoken";
// import config from "../config";

export default (token) =>
  new Promise(
    ( resolve,reject) => {
      jwt.verify(
        token,
        "jWqdGi6J5RTHOied8mxl" || "",
        (err, decodedData) => {
          if (err || !decodedData) {
            return reject(err);
          }

          resolve(decodedData);
        }
      );
    }
  );