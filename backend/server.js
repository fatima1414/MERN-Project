const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
// const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session");

require("./config/db")();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);


// app.use(cookieParser())
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET_KEY],
   maxAge: 24 * 60 * 60 * 1000 // 1 day

  })
);
app.use(express.json());
app.use(express.urlencoded());

// app.use('/uploads',express.static('uploads'))
app.use("/profile", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("server created");
});

// ...........import routing..........//
const taskRoute = require("./routes/taskRoute");
const BlogRoute = require("./routes/blog.route");
const userRoute = require("./routes/user.route");
const { parse } = require("dotenv");

// .......setup api roting...........//+
app.use("/api/task", taskRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => console.log(`sever connected http://localhost:${PORT}`));
