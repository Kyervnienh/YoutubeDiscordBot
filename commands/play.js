require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { google } = require("googleapis");
const youtube = google.youtube("v3");

const { handlePlayAudio, handlePlayResource } = require("../helpers/player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("yplay")
    .setDescription("Reproduce un video de YouTube. Nyan~")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Término de búsqueda. Nyan~")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("autoplay")
        .setDescription("Reproduce automáticamente el siguiente video. Nyan~")
        .setRequired(false)
    ),
  async execute(interaction) {
    const voiceChannelId = process.env.DISCORD_VOICE_CHANNEL_ID;
    const voiceChannel = interaction.guild.channels.cache.get(voiceChannelId);

    const autoplay = interaction.options.getBoolean("autoplay");
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
        auth: process.env.YOUTUBE_API_KEY,
        maxResults: 1,
        part: "id",
        q: query,
        type: "video",
        videoCategoryId: 10,
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
          autoplay,
          interaction,
          streamUrl,
          voiceChannel,
          voiceChannelId,
        });
      }
    );
  },
};
