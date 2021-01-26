const axios = require('axios');

module.exports = {
    name: 'joke',
    description: 'Returns a random joke',
    cooldown: 3,
    execute(msg, args) {
        axios
            .get('https://official-joke-api.appspot.com/jokes/random')
            .then(res => res.data)
            .then(res => msg.channel.send(`${msg.author} ${res.setup}\n||${res.punchline}||`))
    },
};