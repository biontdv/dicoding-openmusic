const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../exceptions/InvariantError')

class PlaylistsSongService {
  constructor (cacheService) {
    this._pool = new Pool()
    this._cacheService = cacheService
  }

  async addPlaylistsSong (songId, playlistId) {
    const id = `PLSG-${nanoid(16)}`
    const query = {
      text: 'insert into "playlistsSongs" values($1,$2,$3)',
      values: [id, playlistId, songId]
    }
    await this._pool.query(query)
    await this._cacheService.deleteCache(`playlist:${playlistId}`)
  }

  async getPlaylistsSongs (playlistId) {
    try {
      const result = await this._cacheService.getCache(`playlist:${playlistId}`)
      return JSON.parse(result)
    } catch (error) {
      const query = {
        text: 'select b.id,b.title,b.performer from "playlistsSongs" a join musics b on a."musicId"=b.id where a."playlistsId"=$1',
        values: [playlistId]
      }
      const result = await this._pool.query(query)
      await this._cacheService.setCache(`playlist:${playlistId}`, JSON.stringify(result.rows))
      return result.rows
    }
  }

  async deletePlaylistsSongs (musicId, playlistId) {
    const query = {
      text: 'delete from "playlistsSongs" where "playlistsId"=$1 and "musicId"=$2',
      values: [playlistId, musicId]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new InvariantError('gagal menghapus lagu')
    }
    await this._cacheService.deleteCache(`playlist:${playlistId}`)
  }
}

module.exports = PlaylistsSongService
