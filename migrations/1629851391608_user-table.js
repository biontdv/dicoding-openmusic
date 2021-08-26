/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
      notNull: true
    },
    username: {
      type: 'text',
      notNull: true
    },
    password: {
      type: 'text',
      notNull: true
    },
    fullname: {
      type: 'text',
      notNull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}