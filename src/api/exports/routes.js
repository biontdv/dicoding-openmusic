const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.postExportHandler,
    options: {
      auth: 'openmusic_jwt'
    }
  }
]

module.exports = routes
