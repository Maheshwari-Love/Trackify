import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res, next) => {
  let sampleFile;
  let uploadPath;
  if (req.files) {
    sampleFile = req.files.userImage;
  } else {
    sampleFile = "";
  }
  const imagePath = Date.now() + "_" + sampleFile.name;
  uploadPath = "assets/" + Date.now() + "_" + sampleFile.name;
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  if (sampleFile) {
    sampleFile?.mv(uploadPath, async function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
  try {
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      userImage: imagePath,
    });
    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
    }).populate({ path: "expenses" });
    if (foundUser) {
      const check = await bcrypt.compare(req.body.password, foundUser.password);
      if (check) {
        const token = jwt.sign(
          { _id: foundUser._id, email: foundUser.email },
          process.env.SECRET_KEY,
          { issuer: "TeamExpenses", expiresIn: "365d" }
        );
        res.header("token", token).send({
          success: true,
          data: foundUser,
        });
      } else {
        res
          .status(401)
          .send({ success: false, message: "password doesn't match!" });
      }
    } else {
      res.send({
        success: false,
        message: "This email is not registered, please create an account",
      }); 
    }
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getAllUsers = async (req, res, next) => {
  try {
    const getAll = await User.find();
    res.send({ success: true, data: getAll });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getUserById = async (req, res, next) => {
  try {
    const getSingleUser = await User.findById(req.params.id).populate({
      path: "expenses incomes",
    });
    if (getSingleUser) {
      res.send({ success: true, data: getSingleUser });
    } else {
      res.send({ success: false, msg: "user not found" });
    }
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateUserById = async (req, res, next) => {
  try {
    const updateSingleUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: updateSingleUser });
  } catch (err) {
    next(err);
  }
};

// UPDATE DETAILS BY ID
export const updateUserDetailsByID = async (req, res, next) => {
  try {
    const updateSingleUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: updateSingleUser });
  } catch (err) {
    next(err);
  }
};

// CHANGE IMAGE
export const changeProfileImg = async (req, res, next) => {
  let sampleFile;
  let uploadPath;
  if (req.files) {
    sampleFile = req.files.userImage;
  } else {
    sampleFile = "";
  }
  const imagePath = Date.now() + "_" + sampleFile.name;
  uploadPath = "assets/" + Date.now() + "_" + sampleFile.name;
  if (sampleFile) {
    sampleFile?.mv(uploadPath, async function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
  try {
    const userChangeImg = await User.findByIdAndUpdate(
      req.user._id,
      {
        userImage: imagePath,
      },
      { new: true }
    );
    res.send({ message: "uploaded succesfully", data: userChangeImg });
  } catch (err) {
    next(err);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.send({ success: true, msg: "user deleted" });
  } catch (err) {
    next(err);
  }
};

// UPDATE CURRENCY
export const updateCurrencyById = async (req, res, next) => {
  console.log(req.body);
  try {
    const updateSingleUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updateSingleUser);
    res.send({ success: true, data: updateSingleUser });
  } catch (err) {
    next(err);
  }
};
