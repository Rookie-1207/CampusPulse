const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");

const app = express();

// mongoose.connect("mongodb://127.0.0.1:27017/campuspulse")
  // .then(() => console.log("MongoDB connected"))
  // .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

const notices = [
  {
    title: "Mid Semester Exam Schedule Released",
    category: "Academics",
    date: "27 May 2026",
  },
  {
    title: "Coding Club Orientation This Friday",
    category: "Clubs",
    date: "29 May 2026",
  }
];

app.get("/", (req, res) => {
  res.send("CampusPulse API running");
});

app.get("/api/notices", (req, res) => {
  res.json(notices);
});

app.listen(5050, () => {
  console.log("Server started on port 5050");
});

app.delete("/api/notices/:index", (req, res) => {
  const index = req.params.index;

  notices.splice(index, 1);

  res.json({ message: "Notice deleted successfully" });
});