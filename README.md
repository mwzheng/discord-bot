## Discord Bot


Simple discord bot to plays music/posts memes and other stuff on command.

 Songs are from youtube and memes from reddit.


TODO:

- Create a .env file and add your bot_token

- $ npm install


**To Start:**

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


Requirements:
- Must have ffmpeg installed on local machine running the bot if you want to use the audio commands (play, skip, stop)


Resources:

[Meme API](https://github.com/D3vd/Meme_Api)

[Affirmation API](https://github.com/annthurium/affirmations)

[Discord Music Bot Tutorial](https://gabrieltanner.org/blog/dicord-music-bot)

[Discord.js Guide](https://discordjs.guide)