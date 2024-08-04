import { Schema, model } from "mongoose";

const incomeSchema = new Schema({
  amount: { type: Number },
  category: {
    type: String,
    enum: [
      "Salary",
      "Shares",
      "Family-Allowance",
      "Refunds",
      "Sales",
      "Gifts",
      "Properties-Rent",
      "Others",
    ],
  },
  date: { type: Date, default: new Date() },

  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
});

const Incomes = model("incomes", incomeSchema);

export default Incomes;
