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
      role: role,
      exp: 24.hours.from_now.to_i
    }
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end

  def admin?
    role == 'admin'
  end

  def expert?
    role == 'expert'
  end

  private

  def set_default_role
    self.role ||= 'expert'
  end
end
