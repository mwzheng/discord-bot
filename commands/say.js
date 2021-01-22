const discordTTS = require("discord-tts");

module.exports = {
    name: 'say',
    description: 'Converts text to speech',
    cooldown: 3,
    execute(msg, args) {
        var channel = msg.member.voice.channel;

        if (msg.client.songQueue.size !== 0)
            return msg.channel.send(`${msg.author} You can't use !say right now. A song is currently playing!`);

        channel.join()
            .then(connection => {
                connection.play(discordTTS.getVoiceStream(args.join(" ")))
                    .on('finish', () => channel.leave())
            });
    },
};