require('dotenv').config()
const { getVoiceConnection } = require('@discordjs/voice')
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yresume')
    .setDescription('Reanuda la canción actual si está pausada. Nyan~'),
  async execute (interaction) {
    if (!interaction.member.voice.channelId) { return interaction.reply('No estás en un canal de voz. Nyan~') }

    const connection = getVoiceConnection(
      interaction.member.voice.channel.guildId
    )
    if (
      !connection ||
      connection.joinConfig.channelId !== interaction.member.voice.channelId
    ) {
      return interaction.reply(
        'No estoy reproduciendo nada en este canal. Nyan~'
      )
    }

    connection.state.subscription.player.unpause()
    return await interaction.reply('Reanudado. Nyan~')
  }
}
