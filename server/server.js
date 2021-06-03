require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

const auth = require("./src/routes/auth");
const getUserRole = require("./src/routes/getUserRole");
const viewUsers = require("./src/routes/viewUsers");
const doctors = require("./src/routes/doctors");
const getUserInformation = require("./src/routes/getUserInformation");
const port = 3001;

app.use(cors());
//Mongooose connection
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://baris:yagis.1999@ehealthdb.xv9sk.mongodb.net/ehealthDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongoose connected");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/welcome", (req, res) => {
  res.send("Welcome to E-health care project with MERN stack :)");
});

app.use("/", auth);
app.use("/getUserRole", getUserRole);
app.use("/", doctors);
app.use("/", viewUsers);
app.use("/getuserinfo", getUserInformation);

server.listen(process.env.PORT || port, () => {
  console.log(`Server is running on ${port}`);
});
