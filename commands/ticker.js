const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'ticker',
    description: 'Returns the latest info for the given stock from Alpha Vantage',
    usage: '<ticker_name>',
    cooldown: 3,
    async execute(msg, args) {
        if (args.length !== 1) return msg.channel.send(`${msg.author} Please enter a valid ticker`);

        let ticker = args.join('');
        let alphaRequest = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${process.env.ALPHA_VANTAGE_KEY}`

        try {

            let stockData = await axios.get(alphaRequest)
                .then(res => res.data);

            const latestRefreshDate = stockData['Meta Data']['3. Last Refreshed'];
            const latestData = stockData['Time Series (Daily)'][latestRefreshDate];
            const open = parseFloat(latestData['1. open']).toFixed(2);
            const close = parseFloat(latestData['4. close']).toFixed(2);
            const low = parseFloat(latestData['3. low']).toFixed(2);
            const high = parseFloat(latestData['2. high']).toFixed(2);
            const yahooUrl = `https://finance.yahoo.com/quote/${ticker}?p=${ticker}&.tsrc=fin-srch`

            ticker = ticker.toUpperCase();

            const companyName = await axios
                .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${process.env.ALPHA_VANTAGE_KEY}`)
                .then(res => res.data.bestMatches)
                .then(res => res.filter(data => data['1. symbol'] === ticker))
                .then(res => res[0]['2. name'])

            const embeded = new Discord.MessageEmbed()
                .setThumbnail('https://s.yimg.com/cv/apiv2/myc/finance/Finance_icon_0919_250x252.png')
                .setTitle(`${companyName} [${ticker}]`)
                .addFields(
                    { name: '**Date**', value: `${latestRefreshDate}` },
                    { name: '\u200b', value: '\u200b', inline: false },
                    { name: '**Open**', value: `$${open}`, inline: true },
                    { name: '**Close**', value: `$${close}`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: false },
                    { name: '**Low**', value: `$${low}`, inline: true },
                    { name: '**High**', value: `$${high}`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: false },
                )
                .setURL(yahooUrl)
                .setColor('#7CFC00')
                .setFooter(`\nData from Alpha Vantage`)

            msg.channel.send(embeded);
        } catch (error) {
            msg.channel.send(`${msg.author} The ticker [${ticker}] does not exist!`);
        }
    },
};