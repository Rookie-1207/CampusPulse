const Notice = require("../models/Notice");

const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ _id: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notices" });
  }
};

const addNotice = async (req, res) => {
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
};

const updateNotice = async (req, res) => {
  try {
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: req.body.category,
      },
      { new: true }
    );

    res.json(updatedNotice);
  } catch (error) {
    res.status(500).json({ message: "Error updating notice" });
  }
};

const deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notice" });
  }
};

module.exports = {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
};