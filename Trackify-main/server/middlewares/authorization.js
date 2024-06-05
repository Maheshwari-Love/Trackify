import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (payload) {
      const user = await User.findById(payload._id).populate({
        path: "expenses incomes",
      });
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
