const express = require("express");
const cors = require("cors");

const app = express();

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