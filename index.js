const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const photoRoute = require("./routes/photo");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
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
app.use("/api/post", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

// app.use(express.static(path.join(__dirname, "/yoru_hompage_client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/yoru_hompage_client/build", "index.html")
//   );
// });

app.listen(process.env.PORT || 8000, () => console.log("server listening"));
