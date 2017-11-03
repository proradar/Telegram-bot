var express = require('express'),
	app = express(),
	mongo = require('mongojs'),
	sentiment = require('sentiment'),
	bodyParser = require('body-parser')

var db = mongo('localhost:27017/telegram',['messages']);

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '373315504:AAGV6izUZUv1IZ1FCBBbZytlUtiChWSsgMM';

// Chat IDS
const devconBotGroup = "-211727610";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/(.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))
	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;
		var sentence = sentiment(match[1]);

		if(sentence.score < -1){
			if (match[1].length == 6) {
				bot.sendMessage(msg.chat.id, "hOi, i'M teM! "+msg.from.first_name+" "+msg.from.last_name+" saID "+match[1].charAt(0)+match[1].charAt(1)+"****"+match[1].charAt(5)+". teM dOn't LIEK!")
			}
			if (match[1].length == 7) {
				bot.sendMessage(msg.chat.id, "hOi, i'M teM! "+msg.from.first_name+" "+msg.from.last_name+" saID "+match[1].charAt(0)+match[1].charAt(1)+"*****"+match[1].charAt(6)+". teM dOn't LIEK!")
			}
			if (match[1].length == 4) {
				bot.sendMessage(msg.chat.id, "hOi, i'M teM! "+msg.from.first_name+" "+msg.from.last_name+" saID "+match[1].charAt(0)+match[1].charAt(1)+"*"+match[1].charAt(3)+". teM dOn't LIEK!")
			}
			if (match[1].length == 3) {
				bot.sendMessage(msg.chat.id, "hOi, i'M teM! "+msg.from.first_name+" "+msg.from.last_name+" saID "+match[1].charAt(0)+"**. teM dOn't LIEK!")
			}
			if (match[1].length == 5) {
				bot.sendMessage(msg.chat.id, "hOi, i'M teM! "+msg.from.first_name+" "+msg.from.last_name+" saID "+match[1].charAt(0)+match[1].charAt(1)+"***"+match[1].charAt(4)+". teM dOn't LIEK!")
			}
		}
	})
});

bot.onText(/\/add (.+) (.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))

	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;

		match[1] = parseInt(match[1], 10);
		match[2] = parseInt(match[2], 10);

		console.log(match[1]);
		console.log(match[2]);

		var result = match[1] + match[2];
		console.log(result);
		bot.sendMessage(msg.chat.id, "hOi, i'M teM! tHE aNSwer to "+match[1]+" + "+match[2]+" iS "+result+" | /temHelp")
	})
});

bot.onText(/\/subtract (.+) (.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))

	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;

		match[1] = parseInt(match[1], 10);
		match[2] = parseInt(match[2], 10);

		console.log(match[1]);
		console.log(match[2]);

		var result = match[1] - match[2];
		console.log(result);
		bot.sendMessage(msg.chat.id, "hOi, i'M teM! tHE aNSwer to "+match[1]+" - "+match[2]+" is "+result+" | /temHelp")
	})
});

bot.onText(/\/divide (.+) (.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))

	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;

		match[1] = parseInt(match[1], 10);
		match[2] = parseInt(match[2], 10);

		console.log(match[1]);
		console.log(match[2]);

		var result = match[1] / match[2];
		console.log(result);
		bot.sendMessage(msg.chat.id, "hOi, i'M teM! tHE aNSwer to "+match[1]+" / "+match[2]+" IS "+result+" | /temHelp")
	})
});

bot.onText(/\/multiply (.+) (.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))

	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;

		match[1] = parseInt(match[1], 10);
		match[2] = parseInt(match[2], 10);

		console.log(match[1]);
		console.log(match[2]);

		var result = match[1] * match[2];
		console.log(result);
		bot.sendMessage(msg.chat.id, "hOi, i'M teM! tHE aNSwer to "+match[1]+" x "+match[2]+" Is "+result+" | /temHelp")
	})
});

bot.onText(/\/temSell (.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))
	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;
		var sentence = sentiment(match[1]);

		if(sentence.score < -1){
			bot.sendMessage(msg.chat.id, "hOi, i'M teM! "+msg.from.first_name+" tRied tO seLL sOme tHing BAD!")
		}else {
			bot.sendMessage(msg.chat.id, "hOi, i'M teM! bUY OUr neW '"+match[1]+"' from "+msg.from.first_name+" "+msg.from.last_name+". teM wANt tO BAiY! /temHelp")
		}
	})
});

bot.onText(/\/temCharacter/, (msg) => {
  	console.log('msg: '+JSON.stringify(msg))
	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date()}, function(err, item){
		if(err)
			throw err;

			var possible = Array("Toriel","Sans","Papyrus","Tem","Frisk","Alphys","Mettaton","Chara","Asriel","Asgore","Undyne");

			var text = possible[Math.floor(Math.random()*possible.length)];

			bot.sendMessage(msg.chat.id, "hOi, i'M teM! mY fRIENd is "+text+" | /temHelp")
	})
});

bot.onText(/\/temHelp/, (msg) => {
  	console.log('msg: '+JSON.stringify(msg))
	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date()}, function(err, item){
		if(err)
			throw err;

		bot.sendMessage(msg.chat.id, "hOi, i'M teM! tHEse aRE tHiNGs tHaT tEm dO: \n /temHelp - sHoW wHAt tEM DO \n /temAbout - teM tElL ABoUt TEm \n\n MATH \n /divide (x) (y) - x DIvidE y \n /subtract (x) (y) - x mINus y \n /add (x) (y) - x pLuS y \n /multiply (x) (y) - x tiMeS y \n\n RANDOM \n /temRandomLetter (x) - x iS MAx LeTtER, tEm mAkEs rAndom nOnSEnce \n /temCharacter - tEM sAyS tEm'S fRiENds")
	})
});

bot.onText(/\/temAbout/, (msg) => {
  	console.log('msg: '+JSON.stringify(msg))
	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date()}, function(err, item){
		if(err)
			throw err;

		bot.sendMessage(msg.chat.id, "wHAt YoU wAnT TO kNOW ABoUt TEm? \n /askFood \n /askHobby \n /askChild \n| /temHelp")
	})
	bot.onText(/\/askFood/, (msg) => {
	  	console.log('msg: '+JSON.stringify(msg))
		db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
			group_id: msg.chat.id, timestamp: msg.date, created_at: new Date()}, function(err, item){
			if(err)
				throw err;

			bot.sendMessage(msg.chat.id, "tEM lIkeS tO eAt hIs FAVorITe fOoD, TEmMi fLAkEs!")
		})
	});
	bot.onText(/\/askHobby/, (msg) => {
	  	console.log('msg: '+JSON.stringify(msg))
		db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
			group_id: msg.chat.id, timestamp: msg.date, created_at: new Date()}, function(err, item){
			if(err)
				throw err;

			bot.sendMessage(msg.chat.id, "tEM lIkeS tO sEll hIs meRChaNdise tO cuStoMERs!")
		})
	});
	bot.onText(/\/askChild/, (msg) => {
	  	console.log('msg: '+JSON.stringify(msg))
		db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
			group_id: msg.chat.id, timestamp: msg.date, created_at: new Date()}, function(err, item){
			if(err)
				throw err;

			bot.sendMessage(msg.chat.id, "tEM wATcH tEM's eGG, EgG wIlL hAtCH, TEM PROUD PARENT!")
		})
	});
});

bot.onText(/\/temRandomLetter (.+)/, (msg,match) => {
  	console.log('msg: '+JSON.stringify(msg)+', match: '+JSON.stringify(match))

	db.messages.insert({from: msg.from.first_name + " " + msg.from.last_name, username: msg.from.username,
		group_id: msg.chat.id, timestamp: msg.date, created_at: new Date(), message: match[1]}, function(err, item){
		if(err)
			throw err;

		match[1] = parseInt(match[1], 10);
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < match[1]; i++ )
				text += possible.charAt(Math.floor(Math.random() * possible.length));

		bot.sendMessage(msg.chat.id, "hOi, i'M teM! "+text+" | /temHelp")

	})
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var port = process.env.PORT || 8070
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
