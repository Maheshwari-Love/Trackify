import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import DBConnection from "./config/index.js";
import usersRouter from "./routers/usersRouter.js";
import expensesRouter from "./routers/expensesRouter.js";
import incomeRouter from "./routers/incomeRouter.js";

dotenv.config();

const app = express();
app.use(express.static("./assets/"));
app.use(express.json({ limit: "100mb" }));
app.use(morgan("tiny"));
app.use(fileUpload());

//DB Connection
DBConnection();

//cors connection
app.use(cors({ origin:"http://localhost:5173", exposedHeaders: ["token"]}));
app.options('*',cors())
//routers
app.use("/api/users", usersRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api/incomes", incomeRouter);

// handling page not found
app.use((req, res, next) => {
  res.status(404).send({ msg: "Page Not Found" });
});

// handling errors
app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message || "something went wrong");
});

//listening to port
const port = process.env.PORT;
app.listen(port, () => console.log("server connected on port 🎉", port));
