const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const courseRouter = require("./routes/courseRouter");
const refreshRouter = require("./routes/refreshRouter");

const app = express();
dotenv.config();

app.use(express.json());

// database connection
mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// route handle
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/refresh", refreshRouter);
app.use("/course", courseRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong!" });
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
