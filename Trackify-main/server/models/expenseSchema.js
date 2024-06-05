import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
  amount: { type: Number },
  category: {
    type: String,
    enum: [
      "food",
      "shopping",
      "fuel",
      "entertainment",
      "telephone",
      "pets",
      "holidays",
      "kids",
      "insurance",
      "energy",
      "rent",
      "Bills",
      "others",
    ],
  },
  date: { type: Date, default: new Date() },
  reciept: { type: String },
  userId: { type: String },
});

const Expenses = model("expenses", expenseSchema);

export default Expenses;
