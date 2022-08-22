const express = require("express");
const { getAllSubscribers, getSubscriber, createSubscriber, updateSubscriber, deleteSubscriber } = require("../controllers/subscribers");
const subscribersRouter = express.Router();

subscribersRouter.get("/", getAllSubscribers);
subscribersRouter.get("/:id", getSubscriber);
subscribersRouter.post("/", createSubscriber);
subscribersRouter.put("/:id", updateSubscriber);
subscribersRouter.delete("/:id", deleteSubscriber);
module.exports = { subscribersRouter };