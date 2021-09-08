const { Pool } = require('pg')
const { nanoid } = require('nanoid')

const AuthorizationError = require('../exceptions/AuthorizationError')

class PlaylistService {
  constructor () {
    this._pool = new Pool()
  }

  async addPlaylist (name, owner) {
    const id = `PLS-${nanoid(16)}`
    const query = {
      text: 'insert into playlists values ($1,$2,$3)',
      values: [id, name, owner]
    }
    await this._pool.query(query)
    return id
  }

  async getAllPlaylists (owner) {
    const query = {
      text: `select a.id,a.name,b.username from 
             playlists a join users b 
             on a.owner=b.id 
             left join collaborations c 
             on a.id=c."playlistId"  
             where a.owner=$1 or c."userId"=$1`,
      values: [owner]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async getPlaylistsByOwner (id, owner) {
    const query = {
      text: 'select *from playlists where id=$1 and owner=$2',
      values: [id, owner]
    }
    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new AuthorizationError('anda tidak mempunyai hak untuk resource ini')
    }
  }

  async verifyAuthorizationOwnerCollaborator (id, usersId) {
    const query = {
      text: `select *from playlists 
             a left join collaborations b on a.id = b."playlistId" 
             where  
             (a.id=$1 and owner=$2) or ("playlistId"=$1 and"userId"=$2)`,
      values: [id, usersId]
    }
    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new AuthorizationError('anda tidak mempunyai hak untuk resource ini')
    }
  }

  async deletePlaylist (id, owner) {
    await this.getPlaylistsByOwner(id, owner)
    const query = {
      text: 'delete from playlists where id=$1',
      values: [id]
    }
    await this._pool.query(query)
  }
}

module.exports = PlaylistService
