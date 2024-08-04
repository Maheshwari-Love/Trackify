export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    } else if (
      req.user._id.toString() ||
      req.user._id.toString() === req.params.id ||
      req.user.expenses.includes(req.params.id) ||
      req.user.incomes.includes(req.params.id)
    ) {
      next();
    } else {
      res.status(401).send("unauthorized access!");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
