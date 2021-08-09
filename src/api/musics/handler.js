// const ClientError = require('../../exceptions/ClientError')

class MusicHanler {
  constructor (service) {
    this._service = service
    this.postMusicHanler = this.postMusicHanler.bind(this)
    this.getMusicsHandler = this.getMusicsHandler.bind(this)
    this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this)
  }

  async postMusicHanler (request, h) {
    try {
      const { title, year, performer, genre, duration } = request.payload
      const musicID = await this._service.addMusic({ title, year, performer, genre, duration })
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId: musicID
        }
      }).code(201)
      return response
    } catch (error) {
    //   if (error instanceof ClientError) {
    //     const response = h.response({
    //         status: '',
    //     })
    //   }
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.'
      })
      response.code(500)
      console.error(error)
      return response
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
    const { id } = request.params
    const music = await this._service.getMusicById(id)
    return h.response({
      status: 'success',
      data: {
        song: music
      }
    }).code(200)
  }
}

module.exports = MusicHanler
