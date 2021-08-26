const ClientError = require('../../exceptions/ClientError')

class UserHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
    this.postUserHandler = this.postUserHandler.bind(this)
  }

  async postUserHandler (request, h) {
    try {
      this._validator.validateUserPayload(request.payload)
      const userId = await this._service.addUser(request.payload)

      return h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId
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

module.exports = UserHandler
