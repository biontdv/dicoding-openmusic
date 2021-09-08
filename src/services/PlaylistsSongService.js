const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../exceptions/InvariantError')

class PlaylistsSongService {
  constructor () {
    this._pool = new Pool()
  }

  async addPlaylistsSong (songId, playlistId) {
    const id = `PLSG-${nanoid(16)}`
    const query = {
      text: 'insert into "playlistsSongs" values($1,$2,$3)',
      values: [id, playlistId, songId]
    }
    await this._pool.query(query)
  }

  async getPlaylistsSongs (playlistId) {
    const query = {
      text: 'select b.id,b.title,b.performer from "playlistsSongs" a join musics b on a."musicId"=b.id where a."playlistsId"=$1',
      values: [playlistId]
    }
    const result = await this._pool.query(query)

    return result.rows
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
  }
}

module.exports = PlaylistsSongService
