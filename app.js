require("dotenv").config();
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
const {
    getResponse,
    addMessagePool,
    removeMessagePool,
    listMessages,
} = require("./src/messages/helper");

bot.on("message", async (msg) => {
    console.log(msg);
    if (!msg.text) {
        return;
    }

    const chatId = msg.chat.id;
    const message = msg.text.toString().toLowerCase();
    const textSplit = message.split(" ");

    if (textSplit.length > 1) {
        if (textSplit[0].includes("/")) {
            return;
        }

        textSplit.map(async (text) => {
            const res = await getResponse(text);

            if (!res) {
                return;
            }

            bot.sendMessage(chatId, res);
            bot.sendSticker(
                chatId,
                "CAACAgUAAxkBAAEoHTplcUktdwABF6q2yNl8RJ8aNu6SzGcAAggFAALTYjFVH5D7Lr5Zj6QzBA"
            );
        });
    } else {
        const res = await getResponse(message);

        if (!res) {
            return;
        }

        bot.sendMessage(chatId, res);
        bot.sendSticker(
            chatId,
            "CAACAgUAAxkBAAEoHTplcUktdwABF6q2yNl8RJ8aNu6SzGcAAggFAALTYjFVH5D7Lr5Zj6QzBA"
        );
    }
});

bot.onText(/\/add (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const matchSplit = match[1].split(" ");
    const newMsg = matchSplit[0].toLowerCase();
    matchSplit.shift();
    const newRes = matchSplit.join(" ");

    if (!newMsg || !newRes) {
        bot.sendMessage(chatId, "Nhập đủ vào dcmm");
        return;
    }

    const message = await addMessagePool(newMsg, newRes);
    bot.sendMessage(chatId, message);
});
bot.onText(/\/remove (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const matchSplit = match[1].split(" ");
    const message = await removeMessagePool(matchSplit);

    bot.sendMessage(chatId, message);
});

bot.onText(/\/list/, async (msg) => {
    const chatId = msg.chat.id;
    const message = await listMessages();
    bot.sendMessage(chatId, message);
});

bot.onText(/\/dhdt/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "https://youtu.be/61xn61kr_VE?si=1nZrOeb9HyfQhv-A");
});
