const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}',
    handler: handler.deletePlaylistsHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  }
]

module.exports = routes
