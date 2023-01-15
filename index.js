const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options.js')
const TOKEN = '5978744761:AAEPf3b8061h-QVX84oc0Pr9mYsYoxsk0Is'

const bot = new TelegramApi(TOKEN,  {polling: true})

const chats = {}


const startGame = async(chatId) => {
    await bot.sendMessage(chatId, `Зараз я загадаю число від 0 до 9, а ти її відгадай`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;dd
    await bot.sendMessage(chatId, 'Відгадуй', gameOptions);
}

bot.setMyCommands([
    {command: '/start', description: 'Привітання'},
    {command: '/info', description: 'Інформація про вас'},
    {command: '/game', description: 'Гра відгадай число'}
])

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if(text === '/start'){
        await bot.sendSticker(chatId, 'sticker.webp')
        return bot.sendMessage(chatId, `Вітаю в Телеграм боті olibibot автора Кожидла Марка  ${text}`)
    }
    if(text === '/info'){
        return bot.sendMessage(chatId, `Тебе звати ${msg.from.first_name} ${msg.from.last_name}`)

    } 
    if(text === '/game'){
            // await bot.sendMessage(chatId, `Зараз я загадаю число від 0 до 9, а ти її відгадай`)
            // const randomNumber = Math.floor(Math.random() * 10)
            // chats[chatId] = randomNumber;
            // return bot.sendMessage(chatId, 'Відгадуй', gameOptions);
            return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'Друже я тебе не розумію, попробуй ще раз!') 
})

bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again') {
          return  startGame(chatId);
    }
    if(data === chats[chatId]){
        return await bot.sendMessage(chatId, `Вітаю ти вгадав число ${chats[chatId]}`, againOptions)
    } else { againOptions
        return bot.sendMessage(chatId, `Ти не вгадав, бот загадав ${chats[chatId]}`,   againOptions)
    } 
})


