class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  before_action :handle_favicon
  
  def index
    respond_to do |format|
      format.html { render 'layouts/application', layout: false }
      format.json { render json: { status: 'ok' } }
    end
  end
  
  private
  
  def handle_favicon
    if request.path == '/favicon.ico'
      send_file Rails.root.join('public', 'favicon.ico'), 
                type: 'image/x-icon', 
                disposition: 'inline'
    end
  end
end
