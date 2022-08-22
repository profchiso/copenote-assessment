const express = require("express");
const { getAllMessages, getMessage, createMessage, updateMessage, deleteMessage } = require("../controllers/messages");
const messagesRouter = express.Router();

messagesRouter.get("/", getAllMessages);
messagesRouter.get("/:id", getMessage);
messagesRouter.post("/", createMessage);
messagesRouter.put("/:id", updateMessage);
messagesRouter.delete("/:id", deleteMessage);



module.exports = { messagesRouter };