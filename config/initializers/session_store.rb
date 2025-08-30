# Configure session store
if Rails.application.config.api_only
  # Disable session store for API
  Rails.application.config.session_store :disabled
  Rails.application.config.action_dispatch.cookies_serializer = :json
else
  # Enable cookie store for non-API requests
  Rails.application.config.session_store :cookie_store, 
    key: '_auto_ai_agent_session',
    secure: Rails.env.production?,
    same_site: :lax,
    expire_after: 1.week,
    secret: 'a_very_long_and_secure_development_secret_key_1234567890_1234567890_1234567890',
    encrypt: false  # Disable encryption
end
