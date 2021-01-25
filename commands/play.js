const ytdl = require('ytdl-core');
const ytsearch = require('yt-search');

const url_regex = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})';

module.exports = {
    name: 'play',
    description: 'Play a song',
    cooldown: 2,
    usage: '<song_name/youtube_url>',
    async execute(msg, args) {
        try {
            const songQueue = msg.client.songQueue;
            const serverQueue = msg.client.songQueue.get(msg.guild.id);
            const voiceChannel = msg.member.voice.channel;

            args = args.join(' ');

            if (args.trim() === '') return;

            let youtubeURL;

            if (args.match(url_regex)) {
                youtubeURL = args;
            } else {
                const video = await ytsearch(args);
                youtubeURL = (video.videos.length > 1) ? video.videos[0].url : null;
            }

            if (!voiceChannel)
                return msg.channel.send("You need to be in a voice channel to play music!");

            const permissions = voiceChannel.permissionsFor(msg.client.user);

            if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
                return msg.channel.send("I need the permissions to join and speak in your voice channel!");

            const songInfo = await ytdl.getInfo(youtubeURL);

            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };

            if (!serverQueue) {
                const queueContruct = {
                    textChannel: msg.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 2,
                    playing: true
                };

                songQueue.set(msg.guild.id, queueContruct);
                queueContruct.songs.push(song);

                try {
                    var connection = await voiceChannel.join();
                    queueContruct.connection = connection;
                    this.play(msg, queueContruct.songs[0]);
                } catch (err) {
                    console.log(err);
                    songQueue.delete(message.guild.id);
                    return msg.channel.send(err);
                }
            } else {
                serverQueue.songs.push(song);
                return msg.channel.send(
                    `**${song.title}** has been added to the queue!`
                );
            }
        } catch (error) {
            console.log(error);
            msg.channel.send(error.msg);
        }
    },
    play(message, song) {
        const queue = message.client.songQueue;
        const guild = message.guild;
        const serverQueue = queue.get(message.guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
                serverQueue.songs.shift();
                this.play(message, serverQueue.songs[0]);
            })
            .on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        serverQueue.textChannel.send(`Started playing: **${song.title}**`);
    }
}