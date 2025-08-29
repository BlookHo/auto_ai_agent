require 'securerandom'

class User < ApplicationRecord
  has_secure_password

  ROLES = %w[admin expert].freeze

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 8 }, if: -> { new_record? || !password.nil? }
  validates :role, inclusion: { in: ROLES, message: "%{value} is not a valid role" }

  # Associations
  has_many :cars, dependent: :destroy
  has_many :symptoms, foreign_key: 'author_id', dependent: :nullify
  has_many :diagnostic_sessions, through: :cars

  before_validation :set_default_role

  def generate_jwt
    payload = {
      user_id: id,
      email: email,
      name: name,
      role: role,
      avatar: avatar_url,
      exp: 24.hours.from_now.to_i
    }
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end
  
  def avatar_url
    # Generate a default avatar URL using the user's name or email
    name_to_use = name.presence || email.split('@').first
    "https://ui-avatars.com/api/?name=#{URI.encode_www_form_component(name_to_use)}&background=random"
  end

  def admin?
    role == 'admin'
  end

  def expert?
    role == 'expert'
  end

  private

  # Generate a password reset token and set the reset timestamp
  def generate_password_reset_token!
    self.reset_password_token = SecureRandom.urlsafe_base64
    self.reset_password_sent_at = Time.zone.now
    save(validate: false)
  end

  # Check if the password reset token is still valid (24 hours)
  def password_reset_token_valid?
    reset_password_sent_at && reset_password_sent_at > 2.days.ago
  end

  # Clear the password reset fields
  def clear_password_reset_token!
    self.reset_password_token = nil
    self.reset_password_sent_at = nil
    save(validate: false)
  end

  private

  def set_default_role
    self.role ||= 'expert'
  end
end
