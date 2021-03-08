import jwt from "jsonwebtoken";
import { reduce } from "lodash";

export default (user) => {
  const token = jwt.sign(
    {
      data: reduce(
        user,
        (result, value, key) => {
          if (key !== "password") {
            result[key] = value;
          }
          return result;
        },
        {}
      ),
    },
    "jWqdGi6J5RTHOied8mxl" || "",
    {
      expiresIn: 10080,
      algorithm: "HS256",
    }
  );

  return token;
};