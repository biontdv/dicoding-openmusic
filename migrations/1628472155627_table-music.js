/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('musics', {
    id: {
      type: 'varchar(50)',
      primaryKey: true
    },
    title: {
      type: 'text',
      notNull: true
    },
    year: {
      type: 'integer',
      notNull: true
    },
    performer: {
      type: 'text',
      notNull: true
    },
    genre: {
      type: 'text',
      notNull: true
    },
    duration: {
      type: 'integer',
      notNull: true
    },
    insertedAt: {
      type: 'text',
      notNull: true
    },
    updatedAt: {
      type: 'text',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('musics')
}
