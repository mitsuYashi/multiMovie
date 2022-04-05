class UserController < ApplicationController
    def index
        # user = User.find_by(uid: params[:uid])
        # user = FirebaseIdToken::Signature.verify params[:token]
        render json: current_user
    end
end
