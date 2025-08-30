require_relative "boot"

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
# require "active_job/railtie"
require "active_record/railtie"
# require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
# require "action_mailbox/engine"
# require "action_text/engine"
require "action_view/railtie"
# require "action_cable/engine"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Finapi
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Ensure secret_key_base is set for all environments
    config.require_master_key = false
    
    # Set a fallback secret key base for development and test
    if Rails.env.development? || Rails.env.test?
      config.secret_key_base = ENV['SECRET_KEY_BASE'] || 'development_secret_key_1234567890_1234567890_1234567890_1234567890_1234567890_1234567890_1234567890_1234567890_1234567890_1234567890'
    end
    
    # Configure API mode
    config.api_only = true
    
    # Disable all session and encryption handling
    config.middleware.delete ActionDispatch::Session::CookieStore
    config.middleware.delete ActionDispatch::Flash
    config.middleware.delete ActionDispatch::RequestId
    config.middleware.delete Rack::MethodOverride
    
    # Disable all encryption and authentication
    config.action_controller.allow_forgery_protection = false
    config.action_controller.perform_caching = false
    config.action_dispatch.cookies_serializer = :json
    config.action_dispatch.use_authenticated_message_encryption = false
    
    # Disable Active Record encryption
    config.active_record.encryption.primary_key = ''
    config.active_record.encryption.deterministic_key = ''
    config.active_record.encryption.key_derivation_salt = ''
    config.active_record.encryption.support_unencrypted_data = true
    config.active_record.encryption.validate_column_size = false

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Add client directory to autoload paths
    config.autoload_paths << Rails.root.join('client/src')
    config.assets.paths << Rails.root.join('client/src/assets')
    
# Keep debug exceptions for development
    config.middleware.use ActionDispatch::DebugExceptions, config.consider_all_requests_local

    # Disable unnecessary Rails generators
    config.generators do |g|
      g.assets false
      g.helper false
      g.stylesheets false
      g.javascripts false
      g.test_framework false
    end

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    
    # Enable serving of static files from the /public folder
    config.public_file_server.enabled = true
    
    # Set cache headers for static files
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=31536000',
      'Expires' => 1.year.from_now.httpdate
    }

    # Configure the application for a full web application (not API-only)
    config.api_only = false
  end
end
