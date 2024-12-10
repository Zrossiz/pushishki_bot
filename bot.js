const { Telegraf } = require('telegraf');
const { BOT_ID, API_URL } = require('./config');

const bot = new Telegraf(BOT_ID);

bot.on('callback_query', async (ctx) => {
    const callbackData = ctx.update.callback_query.data;
    if (callbackData.startsWith('activate')) {
        const id = callbackData.split('_')[1];
        await axios.put(`${API_URL}/review/${id}`)
        await ctx.reply(`Отзыв активирован ${id}`);
    }
});

bot.launch();

module.exports = { bot };
