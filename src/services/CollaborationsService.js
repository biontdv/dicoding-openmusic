const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../exceptions/InvariantError')

class CollaborationsService {
  constructor () {
    this._pool = new Pool()
  }

  async addCollaborator (playlistId, userId) {
    const id = `CBR-${nanoid(16)}`
    const query = {
      text: 'insert into collaborations values ($1,$2,$3)',
      values: [id, playlistId, userId]
    }
    await this._pool.query(query)
    return id
  }

  async deleteCollaborator (playlistId, userId) {
    const query = {
      text: 'delete from collaborations where "playlistId"=$1 and "userId"=$2',
      values: [playlistId, userId]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new InvariantError('gagal menghapus collaborator')
    }
  }
}

module.exports = CollaborationsService
