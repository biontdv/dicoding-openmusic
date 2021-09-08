const ClientError = require('../../exceptions/ClientError')

class PlaylistsSongsHandler {
  constructor (playlistsService, playlistsSongsService, validator) {
    this._playlistsService = playlistsService
    this._playlistsSongsService = playlistsSongsService
    this._validator = validator
    this.postPlaylistsSongsHandler = this.postPlaylistsSongsHandler.bind(this)
    this.getPlaylistsSongsHandler = this.getPlaylistsSongsHandler.bind(this)
    this.deletePlaylistSongsHandler = this.deletePlaylistSongsHandler.bind(this)
  }

  async postPlaylistsSongsHandler (request, h) {
    try {
      this._validator.PlayListsSongsValidate(request.payload)
      const { playlistId } = request.params
      const { songId } = request.payload
      const { id: userId } = request.auth.credentials
      await this._playlistsService.verifyAuthorizationOwnerCollaborator(playlistId, userId)
      await this._playlistsSongsService.addPlaylistsSong(songId, playlistId)
      return h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist'
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

  async getPlaylistsSongsHandler (request, h) {
    try {
      const { playlistId } = request.params
      const { id: userId } = request.auth.credentials
      await this._playlistsService.verifyAuthorizationOwnerCollaborator(playlistId, userId)
      const songs = await this._playlistsSongsService.getPlaylistsSongs(playlistId)
      return h.response({
        status: 'success',
        data: {
          songs
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

  async deletePlaylistSongsHandler (request, h) {
    try {
      this._validator.PlayListsSongsValidate(request.payload)
      const { playlistId } = request.params
      const { songId: musicId } = request.payload
      const { id: userId } = request.auth.credentials
      await this._playlistsService.verifyAuthorizationOwnerCollaborator(playlistId, userId)
      await this._playlistsSongsService.deletePlaylistsSongs(musicId, playlistId)
      return h.response({
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist'
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
}

module.exports = PlaylistsSongsHandler
