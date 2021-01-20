const axios = require('axios');

// Replies with an affirmation to the user
module.exports = {
    name: 'affirmation',
    description: 'Affirmation!',
    cooldown: 3,
    execute(msg, args) {
        axios.get('https://www.affirmations.dev')
            .then(res => {
                let affirmation = res.data.affirmation;
                msg.channel.send(`${msg.author} ${affirmation}`);
            })
            .catch(error => {
                console.log(error);
            })
    },
};