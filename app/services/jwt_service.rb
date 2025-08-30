class JwtService
  # Use a static secret for development
  HMAC_SECRET = 'a_very_long_development_secret_key_1234567890_1234567890_1234567890'
  ALGORITHM = 'HS256'.freeze

  def self.encode(payload, exp = 24.hours.from_now)
    payload = payload.dup
    payload[:exp] = exp.to_i
    JWT.encode(payload, HMAC_SECRET, ALGORITHM, { typ: 'JWT' })
  end

  def self.decode(token)
    body = JWT.decode(
      token,
      HMAC_SECRET,
      true,
      { 
        algorithm: ALGORITHM,
        verify_expiration: true,
        verify_iat: true,
        verify_jti: false,
        verify_iss: false,
        verify_aud: false,
        sub: false,
        leeway: 30
      }
    ).first
    
    HashWithIndifferentAccess.new(body)
  rescue JWT::DecodeError => e
    Rails.logger.error "JWT Decode Error: #{e.message}"
    raise JWT::DecodeError, 'Invalid token'
  end
end
