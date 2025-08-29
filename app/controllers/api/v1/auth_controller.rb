module Api
  module V1
    class AuthController < BaseController
      # Skip authentication for these actions
      skip_before_action :authenticate_request, only: [:login, :register, :preflight, :forgot_password, :reset_password]
      
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
        # Handle both formats: {email: 'x', password: 'y'} and {auth: {email: 'x', password: 'y'}}
        auth_params = params[:auth] || params
        email = auth_params[:email]&.downcase
        password = auth_params[:password]
        
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

      # POST /api/v1/auth/forgot_password
      def forgot_password
        user = User.find_by(email: params[:email].downcase)
        
        if user
          user.generate_password_reset_token!
          reset_url = "#{ENV['FRONTEND_URL']}/reset-password?token=#{user.reset_password_token}"
          UserMailer.password_reset(user, reset_url).deliver_now
        end
        
        # Always return success to prevent user enumeration attacks
        render json: { message: 'If your email exists in our system, you will receive password reset instructions.' }
      end

      # POST /api/v1/auth/reset_password
      def reset_password
        user = User.find_by(reset_password_token: params[:token])
        
        if user && user.password_reset_token_valid?
          if params[:password].blank?
            return render json: { error: 'Password cannot be blank' }, status: :unprocessable_entity
          end
          
          if user.update(password: params[:password], password_confirmation: params[:password_confirmation])
            user.clear_password_reset_token!
            render json: { message: 'Your password has been reset successfully. Please log in with your new password.' }
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Invalid or expired password reset token' }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation, :role, :name)
      end
    end
  end
end
