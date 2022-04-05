class MovieController < ApplicationController
    
    skip_before_action :authenticate_user
    def create
        unless movie = Movie.find_by(create_movie_params)
            movie = Movie.create(create_movie_params)
        end
        render json: movie
    end

    def show
        movie = Movie.find_by(uid: params[:id])
        render json: movie
    end

    private 
    def create_movie_params
        params.require(:movie).permit(:uid, :title)
    end
end
