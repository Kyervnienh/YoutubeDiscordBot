require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');

// function that returns a list of commands available
const getCommands = (client) => {
  const commands = client?.commands?.map((command) => ({
    name: command.data.name,
    value: command.data.description,
  }));
  return commands ?? [];
};

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
          fields: getCommands(interaction.client),
          color: 0x26f0d1,
        },
      ],
    });
  },
};
