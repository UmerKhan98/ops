const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Chat } = require("../models/Chat");

router.get("/getchats", auth, (req, res) => {
  Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});

module.exports = router;
