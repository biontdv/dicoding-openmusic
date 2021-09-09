const ClientError = require('../../exceptions/ClientError')

class CollaborationsHandler {
  constructor (service, validator, playlistService) {
    this._service = service
    this._validator = validator
    this._playlistsService = playlistService
    this.postCollaborationsHandler = this.postCollaborationsHandler.bind(this)
    this.deleteCollaborationsHandler = this.deleteCollaborationsHandler.bind(this)
  }

  async postCollaborationsHandler (request, h) {
    try {
      const { playlistId, userId } = request.payload
      console.log(userId)
      this._validator.collaborationsValidate(request.payload)
      const { id: owner } = request.auth.credentials
      await this._playlistsService.getPlaylistsByOwner(playlistId, owner)
      const collaborationId = await this._service.addCollaborator(playlistId, userId)
      return h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId
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

  async deleteCollaborationsHandler (request, h) {
    try {
      this._validator.collaborationsValidate(request.payload)
      const { playlistId, userId } = request.payload
      const { id: owner } = request.auth.credentials
      await this._playlistsService.getPlaylistsByOwner(playlistId, owner)
      await this._service.deleteCollaborator(playlistId, userId)
      return h.response({
        status: 'success',
        message: 'Kolaborasi berhasil dihapus'
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

module.exports = CollaborationsHandler
