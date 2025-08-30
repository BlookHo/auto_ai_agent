class LlmSetting < ApplicationRecord
  # Associations
  belongs_to :user

  # Validations
  validates :provider, presence: true, inclusion: { in: %w[openai anthropic llama mistral] }
  validates :model, presence: true
  validates :temperature, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 2 }
  validates :user_id, uniqueness: { scope: :provider, message: 'already has settings for this provider' }
  
  # Callbacks
  before_validation :set_defaults
  
  # Default values
  DEFAULT_MODELS = {
    'openai' => 'gpt-4',
    'anthropic' => 'claude-2',
    'llama' => 'llama-2-70b',
    'mistral' => 'mistral-medium'
  }.freeze

  # Encrypt API key before saving
  attr_encrypted :api_key, 
    key: ENV['ENCRYPTION_KEY'] || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
    algorithm: 'aes-256-gcm',
    mode: :per_attribute_iv_and_salt

  # Scopes
  scope :for_user, ->(user) { where(user: user) }
  scope :by_provider, ->(provider) { where(provider: provider) }

  # Class methods
  def self.find_or_initialize_for_user(user, provider: 'openai')
    find_or_initialize_by(user: user, provider: provider)
  end

  # Instance methods
  def to_h
    {
      id: id,
      provider: provider,
      model: model,
      temperature: temperature.to_f,
      created_at: created_at,
      updated_at: updated_at,
      api_key: api_key.present? ? '********' : nil
    }.compact
  end
  
  private
  
  def set_defaults
    self.model ||= DEFAULT_MODELS[provider]
    self.temperature ||= 0.7
  end
  end
end
