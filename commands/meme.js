const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'meme',
    description: 'Sends back a random meme',
    cooldown: 3,
    execute(msg, args) {
        const baseApi = 'https://meme-api.herokuapp.com/gimme';
        let subreddit = args.join("");

        url = (subreddit) ? `${baseApi}/${subreddit}` : baseApi;

        axios.get(url)
            .then(res => {
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