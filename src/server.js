import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(logger("dev"));

app.use(express.static(`${__dirname}/static`));

app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", (socket) => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotification", {
      message,
      nickname: socket.nickname || "anonymous",
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
