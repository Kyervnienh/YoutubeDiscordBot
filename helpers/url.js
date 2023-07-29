const youtubeHostnames = ['youtube.com', 'www.youtube.com']
const youtubeVideoBaseUrl = 'https://www.youtube.com/watch?v='

const isYoutubeUrl = (urlString) => {
  try {
    const url = new URL(urlString)
    return youtubeHostnames.includes(url.hostname)
  } catch (e) {
    return false
  }
}

const getVideoUrlById = (videoId) => {
  return `${youtubeVideoBaseUrl}${videoId}`
}

module.exports = { getVideoUrlById, isYoutubeUrl }
