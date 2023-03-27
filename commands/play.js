require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require("@discordjs/voice");
const play = require("play-dl");

const { google } = require("googleapis");
const youtube = google.youtube("v3");

const handlePlayAudio = async ({
  voiceChannelId,
  voiceChannel,
  interaction,
  streamUrl,
}) => {
  let stream, yt_info;

  if (process.env.USE_YOUTUBE_API === "true") {
    yt_info = await play.video_info(streamUrl);
    stream = await play.stream_from_info(yt_info);
  } else {
    const yt_search = await play.search(streamUrl, { limit: 1 });
    yt_info = yt_search[0];
    stream = await play.stream(yt_info.url);
  }

  //Create audio player
  const player = createAudioPlayer();

  player.on("error", (error) => {
    console.error(error);
  });

  player.on("stateChange", (oldState, newState) => {
    if (newState.status === "idle") {
      player.stop();
    }
  });

  //Create audio resource
  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });

  player.play(resource);
  player.metadata = { queue: [yt_info] };

  // Create connection
  const connection = joinVoiceChannel({
    channelId: voiceChannelId,
    guildId: process.env.DISCORD_GUILD_ID,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  const msg = `Reproduciendo: ${streamUrl}, duración: ${
    yt_info?.video_details?.durationInSec || yt_info.durationInSec
  } sec. Nyan~`;
  console.log("succeed ".concat(msg));

  interaction.reply(msg);

  connection.subscribe(player);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yplay")
    .setDescription("Reproduce un video de YouTube. Nyan~")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Término de búsqueda. Nyan~")
        .setRequired(true)
    ),
  async execute(interaction) {
    const voiceChannelId = process.env.DISCORD_VOICE_CHANNEL_ID;
    const voiceChannel = interaction.guild.channels.cache.get(voiceChannelId);

    const query = interaction.options.getString("query");

    if (
      query.includes("youtube.com") ||
      process.env.USE_YOUTUBE_API === "false"
    ) {
      handlePlayAudio({
        voiceChannelId,
        voiceChannel,
        interaction,
        streamUrl: query,
      });
      return;
    }

    youtube.search.list(
      {
        part: "id",
        type: "video",
        q: query,
        maxResults: 1,
        auth: process.env.YOUTUBE_API_KEY,
      },
      (err, response) => {
        if (err) {
          console.error(err);
          return interaction.reply("Ocurrió un error al buscar el video. :(");
        }

        const videoId = response?.data?.items[0]?.id?.videoId;
        if (!videoId) return interaction.reply("No se encontró el video. :(");

        const streamUrl = `https://www.youtube.com/watch?v=${videoId}`;

        handlePlayAudio({
          voiceChannelId,
          voiceChannel,
          interaction,
          streamUrl,
        });
      }
    );
  },
};
