const ClientError = require('../../exceptions/ClientError')

class AuthenticationHandler {
  constructor (userService, authService, validator, tokenManager) {
    this._userService = userService
    this._authService = authService
    this._validator = validator
    this._tokenManager = tokenManager
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this)
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this)
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this)
  }

  async postAuthenticationHandler (request, h) {
    try {
      this._validator.PostAuthValidate(request.payload)
      const id = await this._userService.getUserByUsername(request.payload)
      const accessToken = this._tokenManager.generateAccessToken({ id })
      const refreshToken = this._tokenManager.generateRefreshToken({ id })
      await this._authService.addRefreshToken(refreshToken)
      return h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken
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

  async putAuthenticationHandler (request, h) {
    try {
      this._validator.PutAuthValidate(request.payload)
      const { refreshToken } = request.payload
      await this._authService.verifyRefreshToken(refreshToken)
      const { id } = this._tokenManager.verifyRefreshToken(refreshToken)
      const accessToken = this._tokenManager.generateAccessToken({ id })

      return h.response({
        status: 'success',
        message: 'Authentication berhasil diperbarui',
        data: {
          accessToken
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

  async deleteAuthenticationHandler (request, h) {
    try {
      this._validator.DeleteAuthValidate(request.payload)
      const { refreshToken } = request.payload
      await this._authService.deleteRefreshToken(refreshToken)
      return h.response({
        status: 'success',
        message: 'Refresh token berhasil dihapus'
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
module.exports = AuthenticationHandler
