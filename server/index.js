const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://campuspulseUser:User%401207Pulse@campuspulse.qgdpjxy.mongodb.net/?appName=CampusPulse"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

let notices = [
  {
    title: "Mid Semester Exam Schedule Released",
    category: "Academics",
    date: "27 May 2026",
  },
  {
    title: "Coding Club Orientation This Friday",
    category: "Clubs",
    date: "29 May 2026",
  },
];

app.get("/", (req, res) => {
  res.send("CampusPulse API running");
});

app.get("/api/notices", (req, res) => {
  res.json(notices);
});

app.post("/api/notices", (req, res) => {
  const newNotice = {
    title: req.body.title,
    category: req.body.category,
    date: new Date().toDateString(),
  };

  notices.push(newNotice);

  res.status(201).json(newNotice);
});

app.delete("/api/notices/:index", (req, res) => {
  const index = req.params.index;

  notices.splice(index, 1);

  res.json({ message: "Notice deleted successfully" });
});

app.listen(5050, () => {
  console.log("Server started on port 5050");
});



