require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cronJob = require("node-cron");


// requre routes
const { subscribersRouter } = require('./routes/subscribers');
const { messagesRouter } = require('./routes/messages');
const { undefinedRouter } = require('./routes/undefinedRoutes');
const connectToDb = require('./database/dbconnection');

// const { getMessageDifference } = require("./utils/getMessages")
// const { getRandomInt } = require("./utils/generateRandomNumber")
const { sendEmailAtInterval } = require("./cron-jobs/sendMail")

//console.log(getMessageDifference([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]))
//console.log(getRandomInt(3))


const app = express();
app.use(cors())
app.use(express.json());
connectToDb(); // connect to the database

app.get('/', (req, res) => {

    res.status(200).json({ success: true, message: 'Welcome to the CopeNote API', statusCode: 200 });
});

app.use("/api/v1/subscribers", subscribersRouter);
app.use("/api/v1/messages", messagesRouter);
app.use(undefinedRouter)



cronJob.schedule(
    `*/${process.env.MINUTE} * * * *`,
    async() => {
        console.log(`run every  ${process.env.MINUTE} minutes`);
        await sendEmailAtInterval()

    }, { scheduled: true }
);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});