require('dotenv').config();
const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yqueue')
    .setDescription('Muestra la lista de reproducción. Nyan~'),
  async execute(interaction) {
    if (!interaction.member.voice.channelId) {
      return interaction.reply('No estás en un canal de voz. Nyan~');
    }

    const connection = getVoiceConnection(
      interaction.member.voice.channel.guildId,
    );
    if (
      !connection ||
      connection.joinConfig.channelId !== interaction.member.voice.channelId
    ) {
      return interaction.reply(
        'No estoy reproduciendo nada en este canal. Nyan~',
      );
    }

    const queue = connection.state.subscription.player.metadata.queue;
    if (queue.length === 0) {
      return interaction.reply('La lista de reproducción está vacía. Nyan~');
    }

    const queueEmbed = {
      description: 'Nyan~',
      fields: [],
      title: 'Lista de reproducción. Nyan~',
    };

    queue.forEach((track, index) => {
      queueEmbed.fields.push({
        name: `${index + 1}. ${
          track?.title || track?.video_details?.title || 'nyan~'
        }`,
        value: track?.url || track?.video_details?.url || 'nyan~',
      });
    });

    return interaction.reply({ embeds: [queueEmbed] });
  },
};
