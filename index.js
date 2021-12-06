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
const server = require("https").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //connect
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user);
    user &&
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

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

server.listen(process.env.PORT || 8000, () => console.log("server listening"));
