const { Schema, model } = require("mongoose");
const SubscriberSchema = new Schema({
    email: {
        type: String,
        required: true,

    },
    recievedMessages: {
        type: [Number],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: true,
    },
});

const Subscriber = model("Subscriber", SubscriberSchema);
module.exports = Subscriber;