const { CHAT_ID, NOTIFY_USER_ID } = require("../config");
const { bot } = require("../bot");
const { formatPhoneNumber } = require("../utils/formatPhone");

exports.notifyQuestion = async (req, res) => {
  try {
    const { name, phone, question, link } = req.body;
    const message = `<b>Новая заявка!</b>\n\n<b>Имя: </b>${name}\n<b>Телефон: </b>${phone}\n<b>Вопрос: </b>${question}`;

    const replyMarkup = {
      inline_keyboard: [[{ text: "Открыть страницу", url: link }]],
    };

    await bot.telegram
      .sendMessage(CHAT_ID, message, {
        parse_mode: "HTML",
        reply_markup: replyMarkup,
      })
      .then(() => {
        res.status(200).json({ message: "Сообщение успешно отправлено" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Ошибка при отправке сообщения" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.notifyOrder = async (req, res) => {
  try {
    const { name, lastName, phone, delivery, address, price } = req.body;
    const message = `<b>Новый заказ!</b>\n\n<b>Имя:</b> ${name}\n<b>Фамилия:</b> ${lastName}\n<b>Номер телефона:</b> ${phone}\n<b>Доставка:</b> ${delivery.length >= 1 ? delivery : "Не указан"}\n<b>Адрес:</b> ${address.length >= 1 ? address : "Не указан"}\n<b>На сумму:</b> ${price} руб.`;

    await bot.telegram
      .sendMessage(CHAT_ID, message, {
        parse_mode: "HTML",
      })
      .then(() => {
        res.status(200).json({ message: "Сообщение успешно отправлено" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Ошибка при отправке сообщения" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.notifyOneClickOrder = async (req, res) => {
  try {
    const { name, phone, productName, link } = req.body;
    const formattedPhone = formatPhoneNumber(phone);
    const message = `<b>Покупка в один клик!</b>\n\n<b>Имя:</b> ${name}\n<b>Номер телефона:</b> ${formattedPhone}\n<b>Товар:</b> ${productName}`;

    const replyMarkup = {
      inline_keyboard: [[{ text: "Открыть страницу", url: link }]],
    };

    await bot.telegram.sendMessage(CHAT_ID, message, {
      parse_mode: "HTML",
      reply_markup: replyMarkup,
    });

    res.status(200).json({ message: "Сообщение успешно отправлено" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при отправке сообщения" });
  }
};

exports.notifyReview = async (req, res) => {
  try {
    const { id, username, rating, title, description } = req.body;

    const message = `<b>Новый отзыв!</b>\n\n<b>Имя: </b>${username}\n<b>Рейтинг: </b>${rating}\n<b>Заголовок: </b>${title}\n<b>Комментарий: </b>${description}`;
    const replyMarkup = {
      inline_keyboard: [
        [{ text: "Активировать", callback_data: `activate_${id}` }],
      ],
    };
    await bot.telegram
      .sendMessage(CHAT_ID, message, {
        parse_mode: "HTML",
        reply_markup: replyMarkup,
      })
      .then(() => {
        res.status(200).json({ message: "Сообщение успешно отправлено" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Ошибка при отправке сообщения" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.notifyNewPrice = async (req, res) => {
  try {
    const { productName, oldPrice, newPrice } = req.body;

    const message = `<b>Изменение цены у ${productName}</b>\n\n Старая цена: ${oldPrice}\n Новая цена: ${newPrice}`;
    await bot.telegram.sendMessage(NOTIFY_USER_ID, message, {
      parse_mode: "HTML",
    });

    return res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.notifyNewProduct = async (req, res) => {
  try {
    const { productLink, productName, productPrice } = req.body;

    const message = `<b>Создан новый товар!</b>\n\n Название товара: ${productName} \n Цена товара: ${productPrice}₽ \n <a href="${productLink}">Открыть</a>`;
    await bot.telegram.sendMessage(NOTIFY_USER_ID, message, {
      parse_mode: "HTML",
    });

    return res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
