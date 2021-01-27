module.exports = {
    name: 'skip',
    description: 'Skip the current song',
    cooldown: 2,
    execute(msg, args) {
        const serverQueue = msg.client.songQueue.get(msg.guild.id);
        if (!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel to stop the music!');
        if (!serverQueue) return msg.channel.send('There is no song that I could skip!');
        serverQueue.connection.dispatcher.end();
        msg.delete({ reason: 'Reduce chat log spam' });
    },
};