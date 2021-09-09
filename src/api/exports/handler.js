const ClientError = require('../../exceptions/ClientError')

class ExportsHandler {
  constructor (service, playlistsService, validator) {
    this._service = service
    this._validator = validator
    this._playlistService = playlistsService
    this.postExportHandler = this.postExportHandler.bind(this)
  }

  async postExportHandler (request, h) {
    try {
      this._validator.exportsValidate(request.payload)
      const userId = request.auth.credentials.id
      const playlistId = request.params.playlistId
      await this._playlistService.verifyAuthorizationOwnerCollaborator(playlistId, userId)
      const message = {
        targetEmail: request.payload.targetEmail,
        playlistId: request.params.playlistId
      }
      await this._service.sendMessage('export:playlists', JSON.stringify(message))
      return h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses'
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

module.exports = ExportsHandler
