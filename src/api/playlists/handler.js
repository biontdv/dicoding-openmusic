const ClientError = require('../../exceptions/ClientError')

class PlaylistHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
    this.postPlaylistsHandler = this.postPlaylistsHandler.bind(this)
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this)
    this.deletePlaylistsHandler = this.deletePlaylistsHandler.bind(this)
  }

  async postPlaylistsHandler (request, h) {
    try {
      this._validator.playlistsPayloadValidate(request.payload)
      const { name } = request.payload
      const { id: owner } = request.auth.credentials
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

  async getPlaylistsHandler (request, h) {
    try {
      const { id: owner } = request.auth.credentials
      const playlists = await this._service.getAllPlaylists(owner)
      return h.response({
        status: 'success',
        data: {
          playlists
        }
      }).code(200)
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

  async deletePlaylistsHandler (request, h) {
    try {
      const { playlistId } = request.params
      const { id: owner } = request.auth.credentials
      await this._service.deletePlaylist(playlistId, owner)
      return h.response({
        status: 'success',
        message: 'Playlist berhasil dihapus'
      })
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
