const { Pool } = require('pg')
const { nanoid } = require('nanoid')

class PlaylistService {
  constructor () {
    this._pool = new Pool()
  }

  async addPlaylist ({ name, owner }) {
    const id = `PLS-${nanoid(16)}`
    const query = {
      query: 'insert into playlists values ($1,$2,$3)',
      values: [id, name, owner]
    }
    await this._pool.query(query)
    return id
  }
}

module.exports = PlaylistService
