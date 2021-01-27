## Discord Bot


Simple discord bot to plays music/posts memes and other stuff on command.

Songs are from youtube and memes from reddit.


TODO:

- Create a .env file and add your bot_token 

- If you plan on using the !ticker command, get an API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key) (It's free)

- To use the !define command, get a token from [OwlBot](https://owlbot.info/?q=deadly) (It's free)

- To use the !gif command, get an API Key from [Giphy](https://developers.giphy.com/docs/api) (It's free)


**To Start:**
- $ npm install

- $ npm start


Commands:
- **!help [optional command name]:** Gives you info about all commands or a specific command

- **!ping:** Responds with 'Pong' (To test if bot is running)

- **!affirmation:** Responds with a random affirmation

- **!meme [optional subreddit]:** Responds with a random meme from reddit

- **!play [Youtube song link] or [Search term]:** Plays the song / adds it to queue 

- **!skip:** Skips the current song playing

- **!next:** Responds with the next song in queue if there is one

- **!stop:** Clears the queue and stops the current song playing

- **!say [text]:** Converts text to speech

- **!random [optional max number]:** Get a random number between 1 and 100/max_number

- **!joke:** Replies with a random joke

- **!ticker [ticker]:** Responds with the latest info (Open, Close, High, Low) about the stock

- **!define [a_word]:** Defines the given word using OwlBot API (Uses the first definition returned)

- **!gif [optional_search_term]:** Returns a random gif or if provided something related to the search term

- **!clear [number_from_2_100]:** Deletes given number of messages from the channel (between 2 - 100)

Requirements:
- Must have ffmpeg installed on local machine running the bot if you want to use the audio commands (play, skip, stop)

Resources:

[Meme API](https://github.com/D3vd/Meme_Api)

[Affirmation API](https://github.com/annthurium/affirmations)

[Discord Music Bot Tutorial](https://gabrieltanner.org/blog/dicord-music-bot)

[Discord.js Guide](https://discordjs.guide)

[Alpha Vantage Docs](https://www.alphavantage.co/documentation/)

[OwlBot](https://owlbot.info)

[Giphy](https://developers.giphy.com/docs/sdk)