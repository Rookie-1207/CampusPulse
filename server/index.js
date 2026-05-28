require("dotenv").config();
const Notice = require("./models/Notice");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

// let notices = [
//   {
//     title: "Mid Semester Exam Schedule Released",
//     category: "Academics",
//     date: "27 May 2026",
//   },
//   {
//     title: "Coding Club Orientation This Friday",
//     category: "Clubs",
//     date: "29 May 2026",
//   },
// ];

app.get("/api/notices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ _id: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
});

app.post("/api/notices", async (req, res) => {
  try {
    const newNotice = new Notice({
      title: req.body.title,
      category: req.body.category,
    });

    const savedNotice = await newNotice.save();

    res.status(201).json(savedNotice);
  } catch (error) {
    res.status(500).json({ message: "Error adding notice" });
  }
});

app.delete("/api/notices/:id", async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notice" });
  }
});

app.listen(5050, () => {
  console.log("Server started on port 5050");
});



