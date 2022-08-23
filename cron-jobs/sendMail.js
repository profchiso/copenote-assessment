const { getRandomInt } = require("../utils/generateRandomNumber")
const { getAllSubscribers } = require("../utils/getAllSubscribers")
const { getAllMessages, getMessageDifference } = require("../utils/getMessages")
const { sendMailWithSendgrid } = require("../utils/mailing")
exports.sendEmailAtInterval = async() => {

    try {
        let subscibers = await getAllSubscribers()
        let messages = await getAllMessages()
        let messageIds = messages.map(message => message.messageId)
        for (let subsciber of subscibers) {
            let allSubscriberRecievedMail = subsciber.recievedMessages

            let messageDifference = getMessageDifference(messageIds, allSubscriberRecievedMail)
            if (allSubscriberRecievedMail.length == 0) {
                //subscriber has not received any message yet
                let randomMessageIndex = getRandomInt(messages.length)
                let messageToBeSent = messages[randomMessageIndex]
                let mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: subsciber.email,
                    subject: messageToBeSent.subject || `CopeNote Health mail`,
                    text: messageToBeSent.message,
                }
                await sendMailWithSendgrid(mailOptions)
                subsciber.recievedMessages.push(messageToBeSent.messageId)
                await subsciber.save()


            } else if (allSubscriberRecievedMail.length >= 1 && messageDifference.length == 0) {
                //subscriber have recieved all messages
                console.log("subscriber already recieved all messages")
                continue;
            } else if (allSubscriberRecievedMail.length >= 1 && messageDifference.length >= 1) {
                //have some messages to recieve
                let randomMessageIndex = getRandomInt(messageDifference.length)
                let randomMessageId = messageDifference[randomMessageIndex]
                let randomMessage = messages.filter(message => message.messageId === randomMessageId)

                let mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: subsciber.email,
                    subject: randomMessage[0].subject || `CopeNote Health mail`,
                    text: randomMessage[0].message,
                }
                await sendMailWithSendgrid(mailOptions)
                subsciber.recievedMessages.push(randomMessage[0].messageId)
                await subsciber.save()
            }
        }

    } catch (error) {
        console.log(error);

    }


}