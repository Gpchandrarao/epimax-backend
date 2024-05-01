const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

const PORT = process.env.PORT || 3333;
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongoose Conneted");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

app.use("/user", userRoute);
app.use("/task", taskRoute);
