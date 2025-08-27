module Api
  module V1
    class AuthController < BaseController
      # Skip authentication for these actions
      skip_before_action :authenticate_request, only: [:login, :register, :preflight]
      
      # Skip Pundit callbacks completely for this controller
      skip_after_action :verify_authorized, raise: false
      skip_after_action :verify_policy_scoped, raise: false
      
      # Handle OPTIONS method for CORS preflight
      def preflight
        set_cors_headers
        render plain: '', content_type: 'text/plain'
      end
      
      # Set CORS headers for all responses
      def set_cors_headers
        headers['Access-Control-Allow-Origin'] = 'http://localhost:3033'
        headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        headers['Access-Control-Allow-Credentials'] = 'true'
        headers['Access-Control-Max-Age'] = '600'
      end

      # POST /api/v1/auth/register
      def register
        set_cors_headers
        user = User.new(user_params)
        if user.save
          token = user.generate_jwt
          response.headers.merge!(
            'Access-Control-Allow-Origin' => 'http://localhost:3033',
            'Access-Control-Allow-Credentials' => 'true'
          )
          render json: { 
            user: user.as_json(only: [:id, :email, :name, :role]).merge(avatar: user.avatar_url),
            token: token 
          }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # POST /api/v1/auth/login
      def login
        set_cors_headers
        email = params.dig(:auth, :email) || params[:email]
        password = params.dig(:auth, :password) || params[:password]
        
        user = User.find_by(email: email)
        
        if user&.authenticate(password)
          token = user.generate_jwt
          response.headers.merge!(
            'Access-Control-Allow-Origin' => 'http://localhost:3033',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Expose-Headers' => 'Authorization',
            'Authorization' => "Bearer #{token}"
          )
          render json: { 
            user: user.as_json(only: [:id, :email, :name, :role]).merge(avatar: user.avatar_url),
            token: token 
          }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      # GET /api/v1/auth/me
      def me
        render json: current_user.as_json(only: [:id, :email, :name, :role]).merge(avatar: current_user.avatar_url)
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :role, :name)
      end
    end
  end
end
