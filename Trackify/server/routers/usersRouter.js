import { Router } from "express";
import { auth } from "../middlewares/authorization.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { userValidation } from "../middlewares/validation.js";

const router = Router();

import {
  register,
  login,
  updateUserById,
  getUserById,
  getAllUsers,
  deleteUser,
  updateUserDetailsByID,
  updateCurrencyById,
  changeProfileImg,
} from "../controllers/usersController.js";

router.post("/signUp", userValidation, register);
router.post("/login", login);
router.patch("/updateUserById/:id", auth, isAdmin, updateUserById);
router.patch("/updateUserDetailsById", auth, updateUserDetailsByID);
router.patch("/updateCurrencyById/:id", auth, isAdmin, updateCurrencyById);
router.get("/getUserById/:id", auth, isAdmin, getUserById);
router.get("/getAllUsers", auth, isAdmin, getAllUsers);
router.delete("/deleteUser/:id", auth, isAdmin, deleteUser);
router.get("/verifytoken", auth, (req, res) => {
  res.send({ success: true, data: req.user });
});

router.patch("/changeProfileImg", auth, changeProfileImg);

export default router;
