class User < ApplicationRecord
    has_many :playlists
    has_many :movies through: :playlists
end
