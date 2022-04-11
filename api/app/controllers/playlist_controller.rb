class PlaylistController < ApplicationController
    def index
        playlists = Playlist.joins(:movie).select(:id, :movie_id, :title).where(user_id: current_user.uid, status: true)
        render json: playlists
    end

    def create
        playlist = Playlist.create(create_playlist_params.merge(user_id: current_user.uid))
        render json: playlist
    end

    def update
        playlist = Playlist.find_by(movie_id: params[:id], user_id: current_user.uid, status: true).update(status: false)
        render json: playlist
    end

    private
    def create_playlist_params
        params.require(:playlist).permit(:movie_id)
    end
end
