class RegistrationController < ApplicationController
    skip_before_action :authenticate_user

    def create
      raise ArgumentError, 'BadRequest Parameter' if payload.blank?
        unless user = User.find_by(uid: payload['sub'])
            user = User.create!(sign_up_params.merge(uid: payload['sub']))
        end
        render json: user, status: :ok
    end

    private

    def sign_up_params
      params.require(:registration).permit(:name)
    end

    def token_from_request_headers
      request.headers['Authorization']&.split&.last
    end

    def token
      params[:token] || token_from_request_headers
    end

    def payload
      @payload ||= FirebaseIdToken::Signature.verify token
    end
end
