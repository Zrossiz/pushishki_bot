require('dotenv').config();
const cors = require('cors');
const express = require('express');
const router   = require('./controller');
const { PORT } = require('./config');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/bot', router);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    };

    console.log(`Bot started on port: ${PORT}`);
});

