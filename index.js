const TelegramBot = require('node-telegram-bot-api');
const fs = require('node-fetch');
const g = require("./pesq");
const rq = require("request");
const app = require('express')()

var token = 'your token telegram-bot';
var bot = new TelegramBot(token, {polling:true});


//pesquisa imagens
bot.onText(/\/pesqimage(.+)/, async function(msg,match){
	var chatId = msg.chat.id;
	var q = match[1];
	console.log(match)
	if(q){
		await g.pesqImage(q)
	  .then((res) => {
	    	console.log(msg)
	    	for(i=0; i<res.length; i++){
				   bot.sendMessage(chatId,"results:\n"+res[i])
	     }
	})
	.catch(e => console.log(e));
	}
	else{
	      bot.sendMessage(chatId,`comando invalido! exemplo: para pesquisar "flores", entre com '/pesqimages flores'`)
	}
	
	//app
	//app.get("/bot", function(req, res){
	//	res.json({})
//	})
//app.listen(3000, function(){
	//	console.log('o app imagem está no ar')})

});
	
//pesquise dados
bot.onText(/\/pesqlink(.+)/, async function(msg,match){
	var chatId = msg.chat.id;
	var q = match[1]
	await g.pesq(q)
	.then((res) => {
		console.log(msg)
		for(i=0; i<res.length; i++){
	    bot.sendMessage(chatId,"results:\n"+res[i])
			}
		})
		.catch((e) => console.log(e))
	});

//bin
bot.onText(/\/bin (.+)/, async function(msg,match){
	var chatId = msg.chat.id;
	var bin = match[1];
	async function ft(){
      await fs("https://lookup.binlist.net/"+bin)
.then(res => res.json())
.then(js => {
	console.log(msg)
	        console.log(bin);
	        console.log(js);
            numb = js.number.length;
            band = js.scheme;
            type = js.type;
            style = js.brand;
            prepayd = (js.prepayd = true ? "sim" : "nao");
            count = js.country.name+' '+js.country.emoji;
            bank = js.bank.name;
            ll =`
            dados bin : ${bin}
            tipo: ${type}
            stilo: ${style}
            pre-pago: ${prepayd}
            bandeira: ${band}
            banco: ${bank}
            pais: ${count}`;
            })
.catch(e => {ll = 'por favor, insira uma bin de responsa'});
console.log(ll);
bot.sendMessage(chatId, ll);}

ft();
});


