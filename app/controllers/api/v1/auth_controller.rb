module Api
  module V1
    class AuthController < BaseController
      skip_before_action :authenticate_request, only: [:login, :register]

      # POST /api/v1/auth/register
      def register
        user = User.new(user_params)
        if user.save
          token = user.generate_jwt
          render json: { 
            user: user.as_json(only: [:id, :email, :role]),
            token: token 
          }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # POST /api/v1/auth/login
      def login
        user = User.find_by(email: params[:email])
        
        if user&.authenticate(params[:password])
          token = user.generate_jwt
          render json: { 
            user: user.as_json(only: [:id, :email, :role]),
            token: token 
          }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      # GET /api/v1/auth/me
      def me
        render json: current_user.as_json(only: [:id, :email, :role])
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :role)
      end
    end
  end
end
