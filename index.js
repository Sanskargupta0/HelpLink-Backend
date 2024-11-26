const express = require('express');
const cors = require('cors');
const { errorHandler } = require('supertokens-node/framework/express');
const { middleware } = require('supertokens-node/framework/express');
const supertokens = require('./server/Utils/SuperTokens')
const connectDB = require("./server/Utils/db");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
  

app.use(middleware());

app.get('/', (req, res) => {
    res.status(200).send('Health check passed');
});

app.use(errorHandler());

app.use((err, req, res, next) => {
   res.status(500).send("Internal server error"+err.message);
});
    
const port = process.env.PORT || 3001;
connectDB().then(() => {
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
});
