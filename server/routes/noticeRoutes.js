const express = require("express");

const {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const {
  verifyToken,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getNotices);

router.post("/", verifyToken, adminOnly, addNotice);

router.put("/:id", verifyToken, adminOnly, updateNotice);

router.delete("/:id", verifyToken, adminOnly, deleteNotice);

module.exports = router;