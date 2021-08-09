const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../exceptions/InvariantError')
const NotFoundError = require('../exceptions/NotFoundError')

class MusicService {
  constructor () {
    this._pool = new Pool()
  }

  async addMusic ({ title, year, performer, genre, duration }) {
    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const query = {
      text: 'insert into musics values($1,$2,$3,$4,$5,$6,$7,$8) returning id',
      values: [id, title, year, performer, genre, duration, insertedAt, updatedAt]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async getMusics () {
    // const pool = new Pool({
    //   user: 'developer',
    //   host: 'localhost',
    //   database: 'openmusic',
    //   password: 'qwerty',
    //   port: 5432
    // })
    const result = await this._pool.query('select id,title,performer from musics')
    return result.rows
  }

  async getMusicById (id) {
    const query = {
      text: 'select *from musics where id=$1',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Music tidak ditemukan')
    }
    return result.rows[0]
  }

  async editMusicById (id, { title, year, performer, genre, duration }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'update musics set title=$1, year=$2, performer=$3, genre=$4, duration=$5, "updatedAt"=$6 where id=$7 returning id',
      values: [title, year, performer, genre, duration, updatedAt, id]
    }

    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal ditambahkan')
    }
  }

  async deleteMusicById (id) {
    const query = {
      text: 'delete from musics where id=$1 returning id',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Music tidak ditemukan')
    }
  }
}

module.exports = MusicService

// const service = new MusicService()

// service.deleteMusicById(1)
