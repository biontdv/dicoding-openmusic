const routes = require('./routes')
const PlaylistsSongsHandler = require('./handler')

module.exports = {
  name: 'playlistsSongs',
  version: '1.0.0',
  register: async (server, { playlistsService, playlistsSongsService, validator }) => {
    const handler = new PlaylistsSongsHandler(playlistsService, playlistsSongsService, validator)
    server.route(routes(handler))
  }
}
