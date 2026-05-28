const express = require("express");
const {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const router = express.Router();

router.get("/", getNotices);
router.post("/", addNotice);
router.put("/:id", updateNotice);
router.delete("/:id", deleteNotice);

module.exports = router;