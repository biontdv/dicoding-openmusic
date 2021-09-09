const ClientError = require('../../exceptions/ClientError')

class UploadsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.postUploadsHandler = this.postUploadsHandler.bind(this)
  }

  async postUploadsHandler (request, h) {
    try {
      const { data } = request.payload

      this._validator.uploadValidate(data.hapi.headers)
      const filename = await this._service.writeFile(data, data.hapi)
      return h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/${filename}`
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

module.exports = UploadsHandler
