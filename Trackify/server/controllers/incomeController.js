import Incomes from "../models/incomeSchema.js";
import User from "../models/userSchema.js";

// CREATE
export const createIncome = async (req, res, next) => {
  try {
    const createdIncome = await Incomes.create({
      ...req.body,
      userId: req.user.id,
    });
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { incomes: createdIncome._id },
      });
    } catch (error) {
      console.error("Error updating user income:", error);
    }
    res.send({ success: true, data: createdIncome });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateIncome = async (req, res, next) => {
  try {
    const updateIncome = await Incomes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send({ success: true, data: updateIncome });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteIncome = async (req, res, next) => {
  try {
    const deletedIncome = await Incomes.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { incomes: req.params.id },
    });
    res.send({ success: true, msg: "income deleted" });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getIncomeById = async (req, res, next) => {
  try {
    const getIncomeById = await Incomes.findById(req.params.id);
    res.send({ success: true, data: getIncomeById });
  } catch (err) {
    next(err);
  }
};

// GET BY USER
export const getIncomesByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userIncomes = await Incomes.find({ userId });
    res.send({ success: true, data: userIncomes });
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getAllIncomes = async (req, res, next) => {
  try {
    const getAll = await Incomes.find();
    res.send({ success: true, data: getAll });
  } catch (err) {
    next(err);
  }
};
