class ChangePlaylistsDefault < ActiveRecord::Migration[6.1]
  def change
    change_column_default :playlists, :status, to: true
  end
end
