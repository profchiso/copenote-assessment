const express = require('express');
const cors = require('cors');


// requre routes
const usersRoutes = require('./routes/users');
const messagesRoutes = require('./routes/messages');
const undefinedRoutes = require('./routes/undefinedRoutes');

const app = express();
app.use(cors())
app.use(express.json());



app.get('/', (req, res) => {

    res.status(200).json({ success: true, message: 'Welcome to the CopeNote API' });
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/messages", messagesRoutes);
app.use(undefinedRoutes)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});