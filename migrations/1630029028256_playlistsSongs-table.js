/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('playlistsSongs', {
    id: {
      type: 'varchar(50)',
      notNull: true
    },
    playlistsId: {
      type: 'varchar(50)',
      notNull: true
    },
    musicId: {
      type: 'varchar(50)',
      notNull: true
    }
  })
  pgm.addConstraint('playlistsSongs', 'fk_playlistsId->playlists.id',
    'foreign key("playlistsId") references playlists(id) on delete cascade')

  pgm.addConstraint('playlistsSongs', 'fk_musicId->music.id',
    'foreign key("musicId") references musics(id) on delete cascade')
}

exports.down = (pgm) => {
  pgm.dropTable('playlists')
  pgm.dropConstraint('playlists', 'fk_playlistsId->playlists.id')
  pgm.dropConstraint('playlists', 'fk_musicId->music.id')
}
