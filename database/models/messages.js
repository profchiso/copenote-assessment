const { Schema, model } = require("mongoose");


const MessageSchema = new Schema({
    message: {
        type: String,
        required: true,

    },
    messageId: {
        type: Number,
        required: true,
        index: true,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: true,
    },
});

const Message = model("Message", MessageSchema);
module.exports = Message;