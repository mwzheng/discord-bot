module.exports = {
    name: 'yo',
    description: 'Pings all channel members with message "Any [time]ers',
    cooldown: 3,
    execute(msg, args) {
        let time = new Date().toLocaleTimeString([], { timeZone: 'America/New_York', hour: '2-digit', minute: "2-digit", hour12: true });
        msg.channel.send(`@everyone Any ${time}ers?`);
    },
};