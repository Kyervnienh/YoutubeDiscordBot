require('dotenv').config()

const path = require('path')

const { Client, Collection, GatewayIntentBits } = require('discord.js')

const { getFiles } = require('./helpers/files')

// Initialize client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
})

// Register commands
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = getFiles(commandsPath)

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

// Register events
const eventsPath = path.join(__dirname, 'events')
const eventFiles = getFiles(eventsPath)

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  if (event.once) client.once(event.name, (...args) => event.execute(...args))
  else client.on(event.name, (...args) => event.execute(...args))
}

// Log command name and user tag for each command interaction
client.on('interactionCreate', interaction => {
  if (!interaction.isCommand()) return

  console.log(`command: ${interaction.commandName}, user: ${interaction.user.tag}`)
})

// Login
client.login(process.env.DISCORD_TOKEN)
