import { Router } from "express";

import { auth } from "../middlewares/authorization.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

import {
  createIncome,
  updateIncome,
  deleteIncome,
  getAllIncomes,
  getIncomeById,
  getIncomesByUser,
} from "../controllers/incomeController.js";

router.post("/createIncome", auth, isAdmin, createIncome);
router.patch("/updateIncome/:id", auth, isAdmin, updateIncome);
router.delete("/deleteIncome/:id", auth, isAdmin, deleteIncome);
router.get("/getIncomeById/:id", auth, isAdmin, getIncomeById);
router.get("/getAllIncomes", auth, isAdmin, getAllIncomes);

router.get("/getIncomesByUser", auth, isAdmin, getIncomesByUser);

export default router;
