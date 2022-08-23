const Subsciber = require('../database/models/Subscribers');
exports.getAllSubscribers = async() => {
    try {
        const messages = await Subsciber.find({})
        return messages

    } catch (error) {
        console.log(error);

    }
}