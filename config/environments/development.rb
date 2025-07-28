require "active_support/core_ext/integer/time"

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Make code changes take effect immediately without server restart.
  config.enable_reloading = true

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true
  config.public_file_server.enabled = true
  
  # Enable server timing.
  config.server_timing = true
  
  # Serve static files from the public directory
  config.public_file_server.headers = {
    'Cache-Control' => "public, max-age=#{2.days.to_i}",
    'X-Content-Type-Options' => 'nosniff'
  }

  # Configure webpack dev server
  config.webpacker.check_yarn_integrity = false
  config.x.webpacker[:dev_server_host] = 'http://localhost:3035'
  config.hosts << 'localhost:3035'

  # Allow webpack dev server
  config.consider_all_requests_local = true
  config.action_controller.perform_caching = false

  # Action Mailer configuration
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.perform_deliveries = false
  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.default :charset => "utf-8"
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

  # Enable/disable Action Controller caching. By default Action Controller caching is disabled.
  # Run rails dev:cache to toggle Action Controller caching.
  if Rails.root.join("tmp/caching-dev.txt").exist?
    config.public_file_server.headers = { "cache-control" => "public, max-age=#{2.days.to_i}" }
  else
    config.action_controller.perform_caching = false
  end

  # Change to :null_store to avoid any caching.
  config.cache_store = :memory_store

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Append comments with runtime information tags to SQL queries in logs.
  config.active_record.query_log_tags_enabled = true

  # Raises error for missing translations.
  # config.i18n.raise_on_missing_translations = true

  # Annotate rendered view with file names.
  config.action_view.annotate_rendered_view_with_filenames = true

  # Raise error when a before_action's only/except options reference missing actions.
  config.action_controller.raise_on_missing_callback_actions = true

  # Set server port to 3001
  config.default_url_options = { port: 3001 }
end
