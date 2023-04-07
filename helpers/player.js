require('dotenv').config();
const { EmbedBuilder } = require('discord.js');
const {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice');
const play = require('play-dl');

const getEmbedMessage = ({ title, url, thumbnails, description, channel }) => {
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setURL(url)
    .setAuthor({ name: channel?.name || 'Nya', iconURL: channel?.icons[0].url })
    .setThumbnail(thumbnails?.[0]?.url)
    .setDescription(description?.slice(0, 100).concat('...'));

  return embed;
};

const handlePlayAudio = async ({
  autoplay,
  voiceChannelId,
  voiceChannel,
  interaction,
  streamUrl,
}) => {
  const channel = interaction.guild.channels.cache.get(interaction.channelId);
  // Create audio player
  const player = createAudioPlayer();

  player.on('error', (error) => {
    console.error(error);
  });

  player.on('stateChange', (_, newState) => {
    if (newState.status === AudioPlayerStatus.Idle && autoplay) {
      const relatedVid = player.metadata.current.related_videos;

      if (relatedVid?.length) {
        handlePlayResource({
          autoplay,
          channel,
          followUp: true,
          player,
          streamUrl: getNextRelatedVideo(relatedVid),
        });
      } else {
        channel.send('No hay más videos en la cola. Nyan~');
        player.stop();
      }
    }
  });

  handlePlayResource({ autoplay, channel, player, streamUrl });

  // Create connection
  const connection = joinVoiceChannel({
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    channelId: voiceChannelId,
    guildId: interaction.guildId,
  });

  connection.subscribe(player);
};

const handlePlayResource = async ({
  autoplay,
  channel,
  followUp,
  player,
  streamUrl,
}) => {
  let stream, ytInfo;

  if (process.env.USE_YOUTUBE_API === 'true' || followUp) {
    ytInfo = await play.video_info(streamUrl);
    stream = await play.stream_from_info(ytInfo);
  } else {
    const ytSearch = await play.search(streamUrl, { limit: 1 });
    ytInfo = ytSearch[0];
    stream = await play.stream(ytInfo.url);
  }

  // Create audio resource
  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });

  player.play(resource);
  player.metadata = { autoplay, current: ytInfo, queue: [ytInfo] };

  channel.send({ embeds: [getEmbedMessage(ytInfo.video_details)] });

  console.log('succeed '.concat(streamUrl));
};

const getNextRelatedVideo = (relatedVid) =>
  relatedVid[Math.floor(Math.random() * relatedVid.length) || 0];

module.exports = { getNextRelatedVideo, handlePlayAudio, handlePlayResource };
