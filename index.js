var express = require('express'),
	app = express(),
	mongo = require('mongojs'),
	sentiment = require('sentiment'),
	bodyParser = require('body-parser')

var db = mongo('localhost:27017/telegram',['messages']);

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var chat_id = -211727610;

bot.onText(/\/help (.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))
	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;

		bot.sendMessage(chat_id, 'Help: '+match[1])
	})
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var port = process.env.PORT || 8080
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
