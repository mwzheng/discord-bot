const Owlbot = require('owlbot-js');
const Discord = require('discord.js');

module.exports = {
    name: 'define',
    description: 'Defines the given word',
    cooldown: 3,
    usage: '<a_word>',
    async execute(msg, args) {
        var client = Owlbot(process.env.OWL_BOT_TOKEN);

        if (args.length != 1) return msg.channel.send(`${msg.author} Please enter a single word at a time`);

        let word = args.join('');
        word = word.charAt(0).toUpperCase() + word.slice(1);

        try {
            const wordInfo = await client
                .define(word)
                .then(res => res);

            const { type, emoji, image_url, definition, example } = wordInfo['definitions'][0];
            const { pronunciation } = wordInfo;

            const embeded = new Discord.MessageEmbed()
                .setFooter('Definion from OwlBot API')
                .setTitle(`${word} ${(emoji === null) ? '' : emoji}`)
                .setImage(image_url)
                .addFields(
                    { name: 'Type:', value: type, inline: true },
                    { name: 'Pronunciation:', value: pronunciation, inline: true },
                    { name: 'Definition:', value: definition, inline: false },
                );

            if (example !== null && example !== '') {
                embeded.addFields({ name: 'Example:', value: example });
            }

            msg.channel.send(embeded);
        } catch (err) {
            msg.channel.send(`${msg.author} The word ${word} does not exist in the Owlbot dictionary!`);
        }

        msg.delete({ reason: 'Reduce chat log spam' });
    },
};