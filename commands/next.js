require('dotenv').config();
const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

const {
  getNextRelatedVideo,
  handlePlayResource,
} = require('../helpers/player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ynext')
    .setDescription('Reproduce el siguiente video en la cola. Nyan~'),
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

    const metadata = connection.state.subscription.player.metadata;
    const streamUrl = metadata?.autoplay
      ? getNextRelatedVideo(metadata?.current?.related_videos)
      : metadata?.queue[1];

    if (!streamUrl) {
      interaction.reply('No hay más videos en la cola. Nyan~');
      connection.state.subscription.player.stop();
      return;
    }
    interaction.reply('Vamos al siguiente video. Nyan~');
    handlePlayResource({
      autoplay: metadata.autoplay,
      channel: interaction.guild.channels.cache.get(interaction.channelId),
      followUp: false,
      player: connection.state.subscription.player,
      streamUrl,
    });
  },
};
