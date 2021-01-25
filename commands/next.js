module.exports = {
    name: 'next',
    description: 'Checks what the next song is',
    cooldown: 3,
    execute(msg, args) {
        const songQueue = msg.client.songQueue;
        const serverQueue = songQueue.get(msg.guild.id);

        if (serverQueue.songs.length > 1) {
            msg.channel.send(`The next song is **${serverQueue.songs[1].title}**`)
        } else {
            msg.channel.send('No songs in queue! Add one!');
        }
    },
};