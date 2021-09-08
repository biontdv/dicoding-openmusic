/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      primaryKey: true,
      type: 'varchar(50)',
      notNull: true
    },
    name: {
      type: 'text',
      notNull: true
    },
    owner: {
      type: 'varchar(50)',
      notNull: true
    }
  })

  pgm.addConstraint('playlists', 'fk_owner->users.id',
    'foreign key(owner) references users(id) on delete cascade')
}

exports.down = (pgm) => {
  pgm.dropTable('playlists')
  pgm.dropConstraint('playlists', 'fk_owner->users.id')
}
