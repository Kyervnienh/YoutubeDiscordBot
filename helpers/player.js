require("dotenv").config();
const {
  createAudioPlayer,
  createAudioResource,
  getGroups,
  AudioPlayerStatus,
  joinVoiceChannel,
} = require("@discordjs/voice");
const play = require("play-dl");

const handlePlayAudio = async ({
  autoplay,
  voiceChannelId,
  voiceChannel,
  interaction,
  streamUrl,
}) => {
  const channel = interaction.guild.channels.cache.get(interaction.channelId);
  //Create audio player
  const player = createAudioPlayer();

  player.on("error", (error) => {
    console.error(error);
  });

  player.on("stateChange", (_, newState) => {
    if (newState.status === AudioPlayerStatus.Idle && autoplay) {
      const relatedVid = player.metadata.current.related_videos;

      if (relatedVid?.length)
        handlePlayResource({
          autoplay,
          channel,
          followUp: true,
          player,
          streamUrl: getNextRelatedVideo(relatedVid),
        });
      else {
        channel.send("No hay más videos en la cola. Nyan~");
        player.stop();
      }
    }
  });

  handlePlayResource({ autoplay, channel, player, streamUrl });

  // Create connection
  const connection = joinVoiceChannel({
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    channelId: voiceChannelId,
    guildId: process.env.DISCORD_GUILD_ID,
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
  let stream, yt_info;

  if (process.env.USE_YOUTUBE_API === "true" || followUp) {
    yt_info = await play.video_info(streamUrl);
    stream = await play.stream_from_info(yt_info);
  } else {
    const yt_search = await play.search(streamUrl, { limit: 1 });
    yt_info = yt_search[0];
    stream = await play.stream(yt_info.url);
  }

  //Create audio resource
  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });

  player.play(resource);
  player.metadata = { autoplay, current: yt_info, queue: [yt_info] };

  const msg = `Reproduciendo: ${streamUrl}, duración: ${
    yt_info?.video_details?.durationRaw || yt_info.durationRaw
  }. Nyan~`;

  channel.send(msg);

  console.log("succeed ".concat(msg));
};

const getNextRelatedVideo = (relatedVid) =>
  relatedVid[Math.floor(Math.random() * relatedVid.length) || 0];

module.exports = { getNextRelatedVideo, handlePlayAudio, handlePlayResource };
