const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("CampusPulse API running");
});

const PORT = 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server started on http://127.0.0.1:${PORT}`);
});