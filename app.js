const express = require('express');
const cors = require('cors');


// requre routes
const subscribersRoutes = require('./routes/subscribers');
const messagesRoutes = require('./routes/messages');
const undefinedRoutes = require('./routes/undefinedRoutes');
const dbToConnect = require('./database/dbconnection');


const app = express();
app.use(cors())
app.use(express.json());
dbToConnect(); // connect to the database

app.get('/', (req, res) => {

    res.status(200).json({ success: true, message: 'Welcome to the CopeNote API' });
});

app.use("/api/v1/subscribers", subscribersRoutes);
app.use("/api/v1/messages", messagesRoutes);
app.use(undefinedRoutes)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});