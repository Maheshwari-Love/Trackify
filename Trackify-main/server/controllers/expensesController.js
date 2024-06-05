import Expenses from "../models/expenseSchema.js";
import User from "../models/userSchema.js";

// CREATE
export const createExpense = async (req, res, next) => {
  let sampleFile;
  let uploadPath;
  if (req.files) {
    sampleFile = req.files.file;
  } else {
    sampleFile = "";
  }
  const filePath = Date.now() + "_" + sampleFile.name;
  uploadPath = "assets/" + filePath;

  if (sampleFile) {
    sampleFile?.mv(uploadPath, async function (err) {
      if (err) {
        console.log(err);
      }
    });
  }

  const createExpense = await Expenses.create({
    amount: req.body.amount,
    category: req.body.category,
    date: req.body.date,
    userId: req.body.userId,
    reciept: filePath,
  });

  const updateUserExpenses = await User.findByIdAndUpdate(
    req.body.userId,
    { $push: { expenses: createExpense._id } },
    { new: true }
  ).populate({ path: "expenses" });
  console.log(updateUserExpenses);
  res.json({ success: true, data: updateUserExpenses });
  console.log("File uploaded!");
};

// UPDATE
export const updateExpense = async (req, res, next) => {
  let sampleFile;
  let uploadPath;
  if (req.files) {
    sampleFile = req.files.file;
  } else {
    sampleFile = "";
  }
  uploadPath = "assets/" + Date.now() + "_" + sampleFile.name;
  try {
    const updateExpense = await Expenses.findByIdAndUpdate(
      req.params.id,
      {
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date,
        userId: req.body.userId,
        reciept: uploadPath,
      },
      { new: true }
    );
    res.send({ success: true, data: updateExpense });
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteExpense = async (req, res, next) => {
  try {
    const deleteExpense = await Expenses.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { expenses: req.params.id } },
      { new: true }
    );
    res.send({ success: true, msg: "expense deleted" });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getExpenseById = async (req, res, next) => {
  try {
    const getExpenseById = await Expenses.findById(req.params.id);
    res.send({ success: true, data: getExpenseById });
  } catch (err) {
    next(err);
  }
};

// GET ALL
export const getAllExpenses = async (req, res, next) => {
  try {
    const getAll = await Expenses.find();
    res.send({ success: true, data: getAll });
  } catch (err) {
    next(err);
  }
};

// GET BY USER
export const getExpensesByUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userExpenses = await Expenses.find({ userId });
    res.send({ success: true, data: userExpenses });
  } catch (err) {
    next(err);
  }
};
