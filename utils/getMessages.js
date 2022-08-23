const Message = require('../database/models/messages');

exports.getAllMessages = async() => {
    try {
        const messages = await Message.find({})
        return messages

    } catch (error) {
        console.log(error);

    }
}

exports.getMessageDifference = (allMessages, alreadySentMessages) => {

    let difference = allMessages.filter(x => !alreadySentMessages.includes(x));
    return difference


}