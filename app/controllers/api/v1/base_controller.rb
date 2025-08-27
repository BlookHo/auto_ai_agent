module Api
  module V1
    # Base controller for API endpoints
    class BaseController < ActionController::API
      include ActionController::HttpAuthentication::Token::ControllerMethods
      include Pundit::Authorization
      
      before_action :set_cors_headers
      before_action :authenticate_request
      
      # Configure Pundit
      after_action :verify_authorized, except: [:index, :login, :register, :preflight], unless: :devise_controller?
      after_action :verify_policy_scoped, only: :index, unless: :devise_controller?
      
      rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
      rescue_from JWT::DecodeError, with: :handle_jwt_error
      
      private
      
      def set_cors_headers
        headers['Access-Control-Allow-Origin'] = 'http://localhost:3033'
        headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        headers['Access-Control-Allow-Credentials'] = 'true'
        headers['Access-Control-Max-Age'] = '600'
      end
      
      def authenticate_request
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        
        begin
          @decoded = JwtService.decode(header)
          @current_user = User.find(@decoded[:user_id])
        rescue ActiveRecord::RecordNotFound => e
          render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
          # Don't render error for OPTIONS request
          render json: { errors: e.message }, status: :unauthorized unless request.method == 'OPTIONS'
        end
      end
      
      def current_user
        @current_user
      end
      
      def user_not_authorized(exception)
        render json: { error: 'You are not authorized to perform this action.' }, status: :forbidden
      end
      
      def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
      end
      
      def handle_jwt_error(exception)
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
      
      def render_errors(errors, status = :unprocessable_entity)
        render json: { errors: Array(errors) }, status: status
      end
    end
  end
end
