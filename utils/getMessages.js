const Message = require('../database/models/Messages');

exports.getAllMessages = async() => {
    try {
        const messages = await Message.find({})
        return messages

    } catch (error) {
        console.log(error);

    }
}

exports.getMessageDifferences = async(allMessages, alreadySentMessages) => {

    let difference = allMessages.filter(x => !alreadySentMessages.includes(x));
    return difference


}