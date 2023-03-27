require("dotenv").config();
const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ystop")
    .setDescription("Detiene la canción actual y sale del canal de voz. Nyan~"),
  async execute(interaction) {
    if (!interaction.member.voice.channelId)
      return interaction.reply("No estás en un canal de voz. Nyan~");

    const connection = getVoiceConnection(
      interaction.member.voice.channel.guildId
    );
    if (
      !connection ||
      connection.joinConfig.channelId != interaction.member.voice.channelId
    )
      return interaction.reply(
        "No estoy reproduciendo nada en este canal. Nyan~"
      );

    connection.state.subscription.player.stop();
    connection.destroy();
    return await interaction.reply("Detenido. Nyan~");
  },
};
