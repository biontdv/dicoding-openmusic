const ClientError = require('../../exceptions/ClientError')

class PlaylistHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
    this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this)
  }

  async postPlaylistsHandler (request, h) {
    try {
      this._validator.playlistsPayloadValidate(request.payload)
      const {name} = request.payload
      const { id: owner } = request.auth.credentials
      console.log(request.auth.credentials);
      const playlistId = await this._service.addPlaylist(name, owner)
      return h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId
        }
      }).code(201)
    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message
        }).code(error.statusCode)
      }
      console.log(error)
      return h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      }).code(500)
    }
  }
}

module.exports = PlaylistHandler
