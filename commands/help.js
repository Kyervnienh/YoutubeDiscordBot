require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('yhelp')
    .setDescription('Muestra la lista de comandos. Nyan~'),
  async execute(interaction) {
    return interaction.reply({
      embeds: [
        {
          title: 'Comandos',
          description: 'Lista de comandos disponibles. Nyan~',
          fields: [
            {
              name: '/yplay',
              value: 'Reproduce un video de YouTube. Nyan~',
            },
            {
              name: '/ypause',
              value: 'Pausa la canción actual si está reproduciéndose. Nyan~',
            },
            {
              name: '/yresume',
              value: 'Reanuda la canción actual si está pausada. Nyan~',
            },
            {
              name: '/ynext',
              value: 'Reproduce el siguiente video en la cola. Nyan~',
            },
            {
              name: '/ystop',
              value: 'Detiene la canción actual y sale del canal de voz. Nyan~',
            },
            {
              name: '/yqueue',
              value: 'Muestra la lista de reproducción. Nyan~',
            },
          ],
        },
      ],
    });
  },
};
