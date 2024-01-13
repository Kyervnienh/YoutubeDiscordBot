## Youtube Discord Bot

A Discord bot for playing YouTube audio in a voice channel, for personal use only.

Commands:

- `/yhelp`: Displays the list of commands.
- `/ynext`: Skips to the next video in the playlist.
- `/ypause`: Pauses playback.
- `/yplay {query} {autoplay}`: Plays a YouTube video. Accepts a link or keyword search.
- `/yqueue`: Displays the playlist.
- `/yresume`: Resumes playback.
- `/ystop`: Stops playback and leaves the voice channel.

Packages used:

- [discord.js](https://discord.js.org): Library to interact with Discord API.
- [googleapis](https://github.com/googleapis/google-api-nodejs-client): Google API.
- [play-dl](https://github.com/play-dl/play-dl): Library to stream content from YouTube, Spotify, and SoundCloud.

## Download

To use the bot locally, download this repository. You can download it by running the following command in the terminal in the folder where it will be used:

```
git clone https://github.com/Kyervnienh/YoutubeDiscordBot.git
```

Or you can download it manually, click the "<> Code" button followed by "Download ZIP", once downloaded unzip the files in the folder where it will be used.

## Dependency Installation

1. Install [Node.js](https://nodejs.org) if it is not installed. Download the correct "LTS" version for your operating system [here](https://nodejs.org/download) and follow the installation process.

To check that Node.js is installed, run the following command in a terminal:

```
node -v
```

You should see the installed version of Node in the terminal (e.g., v.18.12.1).

2. Install [pnpm](https://yarnpkg.com/) if it is not installed. To install it, open a terminal and run the following command:

```
npm install --global pnpm
```

To check that pnpm is installed, run the following command in a terminal:

```
pnpm -v
```

You should see the installed version of pnpm in the terminal (e.g., 6.23.6).

3. Open a terminal in the project folder and run the following command:

```
pnpm install
```

## Configure Environment Variables

For the bot to work correctly, we must place the correct credentials in a `.env` file.

Clone the `.env.example` file and rename it to `.env`. Inside you will find the following variables:

#### 1. DISCORD_CLIENT_ID

To get this variable, go [here](https://discord.com/developers/applications) (log in if necessary) and click on the "New Application" button, enter the name you will give to the bot (make sure you have a unique name or an error may occur in later steps), accept the terms and click on "Create". Once created, a screen will open with the title "General information", look for "APPLICATION ID", click to copy and replace it in the `.env` file.

#### 2. DISCORD_TOKEN

To get the token, go to the "Bot" section on the left side of the screen, a new screen will open, click on "Add Bot", once added the bot information will be displayed, where it says "TOKEN" click on "copy" and replace it in the `.env` file.

#### 3. USE_YOUTUBE_API

This variable indicates whether the Google API will be used to search for videos on YouTube, put "true" if you will use the Google API or "false" if you will use the "play-dl" search.

#### 4. YOUTUBE_API_KEY

Replace it only if `USE_YOUTUBE_API=true`.

To get it, go [here](https://console.cloud.google.com/)

- Log in or register
- [Create a new project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
- In the project dashboard, click on "Explore & Enable APIs"
- Go to "YouTube Data API v3" within "YouTube APIs"
- Enable the API
- Create a credential.
- Copy the API key that appears on the screen and replace it in the `.env` file.

If you can't find a section or it appears differently, search for how to enable YouTube API key in Google and follow the steps indicated.

## Add Bot to Discord

Go to the "OAuth2" section, in "URL Generator" select "BOT", a new menu will be displayed, select "Administrator", copy the generated link and paste it in a new tab of your browser, follow the steps and add the bot to the server where you will use it.

## Start the Bot

To start using the bot, open a terminal in the project folder and run one of the following commands:

```
pnpm deploy
```

This command will enable the existing commands in Discord. (It should only be run the first time or each time the project code is changed).

To start the bot, run the following command in the terminal:

```
pnpm start
```

If everything went well, the following message should appear "Ready! Logged in as {name_of_your_bot}"

Now all that remains to be done is to go to Discord and type /yplay `{query}`

`query`: YouTube link or search.

To stop the bot, go to the terminal where it is running and press "ctrl+c"

## Troubleshooting

If you encounter any issues while using the bot, try the following steps:

1. Make sure that all the environment variables in the `.env` file are correctly set.
2. Check the console for any error messages. These messages can provide clues about what's going wrong.
3. Make sure that the bot has the necessary permissions on your Discord server. The bot needs the "View Channel", "Connect", "Speak", and "Use Voice Activity" permissions in the voice channel where it's being used.
4. If you're still having trouble, you can [open an issue](https://github.com/Kyervnienh/YoutubeDiscordBot/issues) on the project's GitHub page.

## Contributing

Contributions to the project are welcome. If you want to contribute, you can [fork the project](https://docs.github.com/en/get-started/quickstart/fork-a-repo), make your changes, and then [submit a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

Please make sure to test your changes thoroughly before submitting a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE.md) file for more information.
