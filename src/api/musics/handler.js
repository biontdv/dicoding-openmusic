
// const InvariantError = require('../../../../notes-app-back-end/src/exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class MusicHanler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator
    this.postMusicHanler = this.postMusicHanler.bind(this)
    this.getMusicsHandler = this.getMusicsHandler.bind(this)
    this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this)
    this.putMusicHandler = this.putMusicHandler.bind(this)
    this.deleteMusicHandler = this.deleteMusicHandler.bind(this)
  }

  async postMusicHanler (request, h) {
    try {
      this._validator.validateMusicPayload(request.payload)
      const musicID = await this._service.addMusic(request.payload)
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId: musicID
        }
      }).code(201)
      return response
    } catch (error) {
      if (error.statusCode === 500) {
        return h.response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.'
        })
      }
      return h.response({
        status: 'fail',
        message: error.message
      }).code(error.statusCode)
    //   if (error instanceof InvariantError) {
    //     return h.response({
    //       status: 'fail'
    //     }).code(error.statusCode)
    //   }
    //   const response = h.response({
    //     status: 'error',
    //     message: 'Maaf, terjadi kegagalan pada server kami.'
    //   })
    //   response.code(500)
    //   console.error(error)
    //   return response
    }
  }

  async getMusicsHandler () {
    const songs = await this._service.getMusics()

    return {
      status: 'success',
      data: {
        songs
      }
    }
  }

  async getMusicByIdHandler (request, h) {
    try {
      const { songId } = request.params
      const song = await this._service.getMusicById(songId)
      return h.response({
        status: 'success',
        data: {
          song
        }
      }).code(200)
    } catch (error) {
      if (error instanceof NotFoundError) {
        return h.response({
          status: 'fail',
          message: error.message
        }).code(error.statusCode)
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }

  async putMusicHandler (request, h) {
    try {
      // this._validator.validateMusicPayload(request.payload)
      const { songId } = request.params
      await this._service.editMusicById(songId, request.payload)
      return h.response({
        status: 'success',
        message: 'lagu berhasil diperbarui'
      }).code(200)
    } catch (error) {
    //   if (error.statusCode === 500) {
    //     return h.response({
    //       status: 'error',
    //       message: 'Maaf, terjadi kegagalan pada server kami.'
    //     })
    //   }
    return error.message
      
    }
  }

  async deleteMusicHandler (request, h) {
    try {
      const { songId } = request.params
      await this._service.deleteMusicById(songId)
      return h.response({
        status: 'success',
        message: 'lagu berhasil dihapus'
      }).code(200)
    } catch (error) {
      if (error instanceof NotFoundError) {
        return h.response({
          status: 'fail',
          message: error.message
        }).code(error.statusCode)
      }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
    }
  }
}

module.exports = MusicHanler
