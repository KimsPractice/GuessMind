import express from "express";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", "src/views");
app.use(express.static("src/static"));

app.get("/", (req, res) => res.render("home"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
