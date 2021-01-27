const axios = require('axios');

module.exports = {
    name: 'affirmation',
    description: 'Responds to user with a random affirmation',
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

        msg.delete({ timeout: 5000, reason: 'Reduce chat log spam' })
    },
};