const express = require('express');
const cors = require('cors');
const { errorHandler } = require('supertokens-node/framework/express');
const { middleware } = require('supertokens-node/framework/express');
const supertokens = require('./server/utils/SuperTokens')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
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

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
