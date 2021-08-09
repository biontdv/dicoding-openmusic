const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postMusicHanler
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getMusicsHandler
  },
  {
    method: 'GET',
    path: '/songs/{songId}',
    handler: handler.getMusicByIdHandler
  },
  {
    method: 'PUT',
    path: '/songs/{songId}',
    handler: handler.putMusicHandler
  },
  {
    method: 'DELETE',
    path: '/songs/{songId}',
    handler: handler.deleteMusicHandler
  }
]
module.exports = routes
