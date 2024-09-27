require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const router = express.Router();
const port = process.env.PORT;
const chatId = process.env.CHAT_ID;
const botId = process.env.BOT_ID;

const bot = new Telegraf(botId);

app.use(express.json());
app.use(cors());
app.use('/bot', router);

router.post('/question', async (req, res) => {
    try {
        const { name, phone, question, link } = req.body;
        const message = `<b>Новая заявка!</b>\n\n<b>Имя: </b>${name}\n<b>Телефон: </b>${phone}\n<b>Вопрос: </b>${question}`;
        
        const replyMarkup = {
            inline_keyboard: [
                [
                    { text: 'Открыть страницу', url: link }
                ]
            ]
        };

        await bot.telegram.sendMessage(
            chatId, 
            message,
            {
                parse_mode: 'HTML',
                reply_markup: replyMarkup
            }
        ).then(() => {
            res.status(200).json({ message: 'Сообщение успешно отправлено' });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Ошибка при отправке сообщения' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.post('/order', async (req, res) => {
    try {
        const { name, lastName, phone, delivery, address, price } = req.body; 
        const message = `<b>Новый заказ!</b>\n\n<b>Имя:</b> ${name}\n<b>Фамилия:</b> ${lastName}\n<b>Номер телефона:</b> ${phone}\n<b>Доставка:</b> ${delivery.length >= 1 ? delivery : 'Не указан'}\n<b>Адрес:</b> ${address.length >= 1 ? address : 'Не указан'}\n<b>На сумму:</b> ${price} руб.` 

        await bot.telegram.sendMessage(
            chatId, 
            message,
            {
                parse_mode: 'HTML',
            }
        ).then(() => {
            res.status(200).json({ message: 'Сообщение успешно отправлено' });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Ошибка при отправке сообщения' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.post('/order/oneClick', async (req, res) => {
    try {
        const { name, phone, productName, link } = req.body;

        const message = `<b>Покупка в один клик!</b>\n\n<b>Имя:</b> ${name}\n<b>Номер телефона:</b> ${phone}\n<b>Товар:</b> ${productName}`;

        const replyMarkup = {
            inline_keyboard: [
                [
                    { text: 'Открыть страницу', url: link }
                ]
            ]
        };

        await bot.telegram.sendMessage(
            chatId, 
            message,
            {
                parse_mode: 'HTML',
                reply_markup: replyMarkup
            }
        );

        res.status(200).json({ message: 'Сообщение успешно отправлено' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при отправке сообщения' });
    }
});

router.post('/review', async (req, res) => {
    try {
        const { id, username, rating, title, description } = req.body;

        const message = `<b>Новый отзыв!</b>\n\n<b>Имя: </b>${username}\n<b>Рейтинг: </b>${rating}\n<b>Заголовок: </b>${title}\n<b>Комментарий: </b>${description}`;
        const replyMarkup = {
            inline_keyboard: [
                [
                    { text: 'Активировать', callback_data: `activate_${id}` }
                ]
            ]
        };
        await bot.telegram.sendMessage(
            chatId, 
            message,
            {
                parse_mode: 'HTML',
                reply_markup: replyMarkup
            }
        ).then(() => {
            res.status(200).json({ message: 'Сообщение успешно отправлено' });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Ошибка при отправке сообщения' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера' });   
    }
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    };

    console.log(`Bot started on port: ${port}`);
});

bot.on('callback_query', async (ctx) => {
    const callbackData = ctx.update.callback_query.data;
    if (callbackData.startsWith('activate')) {
        const id = callbackData.split('_')[1];
        await axios.put(`${process.env.API_URL}/review/${id}`)
        await ctx.reply(`Отзыв активирован ${id}`);
    }
});

bot.launch();