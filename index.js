require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { Telegraf } = require('telegraf');
const router   = require('./controller');
const { BOT_ID, PORT } = require('./config')
const app = express();

const bot = new Telegraf(BOT_ID);

app.use(express.json());
app.use(cors());
app.use('/bot', router);

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    };

    console.log(`Bot started on port: ${PORT}`);
});

bot.launch();

bot.on('callback_query', async (ctx) => {
    const callbackData = ctx.update.callback_query.data;
    if (callbackData.startsWith('activate')) {
        const id = callbackData.split('_')[1];
        await axios.put(`${process.env.API_URL}/review/${id}`)
        await ctx.reply(`Отзыв активирован ${id}`);
    }
});

module.exports = {
    bot
}