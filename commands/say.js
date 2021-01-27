const discordTTS = require("discord-tts");

module.exports = {
    name: 'say',
    description: 'Converts text to speech',
    cooldown: 3,
    usage: '<text_you_want_to_convert_to_speech>',
    execute(msg, args) {
        var channel = msg.member.voice.channel;

        if (args.length < 1) return msg.channel.send(`${msg.author} Please pass in something for me to say.`)

        if (msg.client.songQueue.size !== 0)
            return msg.channel.send(`${msg.author} A song is currently playing!`);

        channel.join()
            .then(connection => {
                connection
                    .play(discordTTS.getVoiceStream(args.join(" ")))
                    .on('finish', () => channel.leave())
            });
    },
};