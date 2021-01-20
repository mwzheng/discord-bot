const axios = require('axios');
const Discord = require('discord.js');

// Replies with a random meme from redit
module.exports = {
    name: 'meme',
    description: 'Sends back a random meme',
    cooldown: 3,
    execute(msg, args) {
        axios.get('https://meme-api.herokuapp.com/gimme')
            .then(res => {
                console.log(res);
                let embed = new Discord.MessageEmbed()
                    .setImage(`${res.data.preview[res.data.preview.length - 1]}`)
                    .setURL(`${res.data.postLink}`)
                    .setDescription(`Title: ${res.data.title}`)

                return msg.reply(embed);
            })
            .catch(error => {
                console.log(error);
            })
    },
};