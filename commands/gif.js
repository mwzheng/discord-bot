const axios = require('axios');

module.exports = {
    name: 'gif',
    description: 'Sends back a random gif based on search term',
    cooldown: 3,
    usage: '<gif_search_term>',
    async execute(msg, args) {
        if (args.length != 1) return msg.channel.send(`${msg.author} Invalid search with command`);

        let searchQuery = args.join('');
        let gifData = await axios
            .get(`http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${process.env.GIPHY_API_KEY}`)
            .then(res => res.data);

        const randomIndex = Math.floor(Math.random() * gifData['pagination']['count']);
        const randomGif = gifData['data'][randomIndex]['embed_url'];

        msg.channel.send(randomGif);
    },
};