require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const port = process.env.PORT;
const chatId = process.env.CHAT_ID;
const botId = process.env.BOT_ID;

const bot = new Telegraf(botId);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    };

    console.log(`Bot started on port: ${port}`);
});

bot.launch();

// import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
// import { Markup, Telegraf } from 'telegraf';
// import { CheckoutOrderDto } from './dto/checkoutOrder.dto';
// import { QuestionDto } from './dto/question.dto';
// import { ReviewDto } from './dto/review.dto';
// import { ForceReply, InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

// @Injectable()
// export class TelegramService {
//   constructor(@Inject('TELEGRAM') private readonly telegram: Telegraf<any>) {}

//   async sendMessage(chatId: number, checkoutOrderDto: CheckoutOrderDto): Promise<{ message: string }> {
//     try {
//       const message: string = `<b>Новый заказ!</b>\n\n<b>Имя:</b> ${checkoutOrderDto.name}\n<b>Фамилия:</b> ${checkoutOrderDto.lastName}\n<b>Номер телефона:</b> ${checkoutOrderDto.phone}\n<b>Доставка:</b> ${checkoutOrderDto.delivery.length >= 1 ? checkoutOrderDto.delivery : 'Не указан'}\n<b>Адрес:</b> ${checkoutOrderDto.address.length >= 1 ? checkoutOrderDto.address : 'Не указан'}\n<b>На сумму:</b> ${checkoutOrderDto.price} руб.` 
//       await this.telegram.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
//       return {
//         message: 'Успешно'
//       }
//     } catch (err) {
//       console.log(err);
//       throw new InternalServerErrorException('Ошибка сервера');
//     }
//   }

//   async sendQuestion(chatId: number, questionDto: QuestionDto) {
//     try {
//         const message: string = `<b>Новая заявка!</b>\n\n<b>Имя: </b>${questionDto.name}\n<b>Телефон: </b>${questionDto.phone}\n<b>Вопрос: </b>${questionDto.question}`;
        
//         const inlineKeyboard: InlineKeyboardMarkup = {
//             inline_keyboard: [
//                 [
//                     { text: 'Открыть страницу', url: String(questionDto.link) }
//                 ]
//             ]
//         };

//         await this.telegram.telegram.sendMessage(
//             chatId,
//             message,
//             {
//                 parse_mode: 'HTML',
//                 reply_markup: inlineKeyboard
//             }
//         );
//     } catch (err) {
//         console.log(err);
//         throw new InternalServerErrorException('Ошибка сервера');
//     }
//   }

//   async sendReview(chatId: number, reviewDto: ReviewDto) {
//     try {
//       const message: string = `<b>Новый отзыв!</b>\n\n<b>Имя: </b>${reviewDto.username}\n<b>Рейтинг: </b>${reviewDto.rating}\n<b>Заголовок: </b>${reviewDto.title}\n<b>Комментарий: </b>${reviewDto.description}`;
//       await this.telegram.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
//     } catch (err) {
//       console.log(err);
//       throw new InternalServerErrorException('Ошибка сервера');
//     }
//   }

// }