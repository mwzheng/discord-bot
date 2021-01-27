module.exports = {
    name: 'random',
    description: 'Returns a random number between 1 and 100/max_number',
    cooldown: 3,
    usage: '<max_number>',
    execute(msg, args) {
        args = args.join('');
        let max = 100;

        if (isNaN(args)) {
            msg.channel.send(`${msg.author} invalid number, defaulting to max 100`);
        } else {
            max = (args) ? parseInt(args) : max;
        }

        const randomNumber = 1 + Math.floor(Math.random() * max);
        msg.channel.send(`${msg.author} You rolled **${randomNumber}**`);
    },
};