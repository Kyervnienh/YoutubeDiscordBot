require('dotenv').config()
const { SlashCommandBuilder } = require('discord.js')
const { google } = require('googleapis')
const youtube = google.youtube('v3')

const { handlePlayAudio } = require('../helpers/player')
const { isYoutubeUrl, getVideoUrlById } = require('../helpers/url')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yplay')
    .setDescription('Reproduce un video de YouTube. Nyan~')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('Término de búsqueda. Nyan~')
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName('autoplay')
        .setDescription('Reproduce automáticamente el siguiente video. Nyan~')
        .setRequired(false)
    ),
  async execute (interaction) {
    const voiceChannelId = interaction?.member?.voice?.channelId
    if (!voiceChannelId) { return interaction.reply('Debes estar en un canal de voz. Nyan~') }
    const voiceChannel = interaction.guild.channels.cache.get(voiceChannelId)

    const autoplay = interaction.options.getBoolean('autoplay')
    const query = interaction.options.getString('query')

    if (
      process.env.USE_YOUTUBE_API === 'false' ||
      isYoutubeUrl(query)
    ) {
      interaction.reply('Buscando video... Nyan~')
      handlePlayAudio({
        interaction,
        streamUrl: query,
        voiceChannel,
        voiceChannelId
      })
      return
    }

    youtube.search.list(
      {
        auth: process.env.YOUTUBE_API_KEY,
        maxResults: 1,
        part: 'id',
        q: query,
        type: 'video',
        videoCategoryId: 10
      },
      (err, response) => {
        if (err) {
          console.error(err)
          return interaction.reply('Ocurrió un error al buscar el video. :(')
        }

        const videoId = response?.data?.items[0]?.id?.videoId
        if (!videoId) return interaction.reply('No se encontró el video. :(')

        interaction.reply('Preparando video... Nyan~')

        handlePlayAudio({
          autoplay,
          interaction,
          streamUrl: getVideoUrlById(videoId),
          voiceChannel,
          voiceChannelId
        })
      }
    )
  }
}
