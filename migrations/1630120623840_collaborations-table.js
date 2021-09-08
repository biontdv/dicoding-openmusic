/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'varchar(50)',
      notNull: true
    },
    playlistId: {
      type: 'varchar(50)',
      notNull: true
    },
    userId: {
      type: 'varchar(50)',
      notNull: true
    }
  })
  pgm.addConstraint('collaborations', 'FK_playlistId->playlists.id',
    'foreign key("playlistId") references playlists(id) on delete cascade on update cascade')
  pgm.addConstraint('collaborations', 'FK_userId->users.id',
    'foreign key("userId") references users(id) on delete cascade on update cascade')
}

exports.down = (pgm) => {
  pgm.dropTable('collaborations')
  pgm.dropConstraint('collaborations', 'FK_playlistId->playlists.id')
  pgm.dropConstraint('collaborations', 'FK_userId->users.id')
}
