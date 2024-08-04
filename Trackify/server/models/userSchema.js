import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true, default: "no name" },
  lastName: { type: String, required: true, default: "no lastname" },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  expenses: [{ type: Schema.Types.ObjectId, ref: "expenses" }],
  incomes: [{ type: Schema.Types.ObjectId, ref: "incomes" }],
  userImage: { type: String },
  currency: { type: String },
  /* isVerify: { type: Boolean, default: false },
    randomToken:{type:String} */
});

const User = model("users", userSchema);

export default User;
