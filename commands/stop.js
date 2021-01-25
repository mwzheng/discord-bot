module.exports = {
    name: 'stop',
    description: 'Stop playing music',
    cooldown: 2,
    execute(msg, args) {
        const serverQueue = msg.client.songQueue.get(msg.guild.id);
        if (!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel to stop the music!');

        msg.channel.send("Clearing queue & leaving the voice channel.")
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    },
};