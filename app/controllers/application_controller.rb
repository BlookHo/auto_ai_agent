class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include Pundit::Authorization
  include Authorization
  
  before_action :handle_favicon
  
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  
  def index
    respond_to do |format|
      format.html { render 'layouts/application', layout: false }
      format.json { render json: { status: 'ok' } }
    end
  end
  
  private
  
  def user_not_authorized(exception)
    policy_name = exception.policy.class.to_s.underscore
    error_key = exception.query || :not_authorized
    error_message = I18n.t("#{policy_name}.#{error_key}", scope: "pundit", default: :default)
    
    respond_to do |format|
      format.json { render json: { error: error_message }, status: :forbidden }
      format.html { redirect_to root_path, alert: error_message }
    end
  end
  
  def record_not_found(exception)
    respond_to do |format|
      format.json { render json: { error: 'Record not found' }, status: :not_found }
      format.html { redirect_to root_path, alert: 'Record not found' }
    end
  end
  
  def handle_favicon
    if request.path == '/favicon.ico'
      send_file Rails.root.join('public', 'favicon.ico'), 
                type: 'image/x-icon', 
                disposition: 'inline'
    end
  end
end

# Base controller for API endpoints
class Api::V1::BaseController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods
  include Pundit::Authorization
  include Authorization
  
  before_action :authenticate_request
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  
  private
  
  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    
    begin
      decoded = JWT.decode(token, Rails.application.credentials.secret_key_base).first
      @current_user = User.find(decoded['user_id'])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
  
  def current_user
    @current_user
  end
  
  def render_errors(errors, status = :unprocessable_entity)
    render json: { errors: errors }, status: status
  end
end
