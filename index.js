const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', msg => {
	function translate(str) {
		axios
			.get(
				'https://dapi.kakao.com/v2/translation/translate?src_lang=kr&target_lang=en',
				{
					params: {
						query: str
					},
					headers: {
						Authorization: 'KakaoAK restapikey'
					}
				}
			)
			.then(function(response) {
				msg.reply(response.data.translated_text[0][0]);
			})
			.catch(function(error) {
				msg.reply('번역 실패');
			});
	}

	if (msg.content.startsWith('!번역')) {
		const a = msg.content.split(' ')[1];
		if (a) {
			translate(a);
		} else {
			msg.reply('번역할 글을 넣어주세요');
		}
	}
});

client.login('');
