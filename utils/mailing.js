const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//SEND EMAIL WITH SENDGRID
exports.sendMailWithSendgrid = async(mailOptions) => {
    try {
        await sgMail.send(mailOptions);
        console.log("mail sent");
    } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error));
    }
};