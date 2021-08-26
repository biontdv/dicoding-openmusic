const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../exceptions/InvariantError')
const AuthenticationError = require('../exceptions/AuthenticationError')
// const NotFoundError = require('../exceptions/NotFoundError')
const bcrypt = require('bcrypt')

class UserService {
  constructor () {
    this._pool = new Pool()
  }

  async addUser ({ username, password, fullname }) {
    await this.verifyUser(username)
    const id = `USR-${nanoid(16)}`
    const hashedPassword = await bcrypt.hash(password, 10)
    const query = {
      text: 'insert into users values ($1,$2,$3,$4) returning id',
      values: [id, username, hashedPassword, fullname]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new InvariantError('User gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async verifyUser (username) {
    const query = {
      text: 'select *from users where username=$1',
      values: [username]
    }
    const result = await this._pool.query(query)
    if (result.rowCount) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.')
    }
  }

  async getUserByUsername ({ username, password }) {
    const query = {
      text: 'select *from users where username=$1',
      values: [username]
    }
    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new AuthenticationError('Kredensial yang anda berikan salah')
    }
    const { id, password: hashedPassword } = result.rows[0]
    const match = await bcrypt.compare(password, hashedPassword)
    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah')
    }
    return id
  }
}

module.exports = UserService
