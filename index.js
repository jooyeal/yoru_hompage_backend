const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const photoRoute = require("./routes/photo");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection success"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json({ extended: true, limit: "30mb" }));

app.use("/api/auth", authRoute);
app.use("/api/photo", photoRoute);
app.listen(process.env.PORT || 8000, () => console.log("server listening"));
