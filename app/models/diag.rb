class Diag < ApplicationRecord
  # Constants
  SEVERITIES = %w[minor moderate critical].freeze
  
  # Associations
  belongs_to :diagnostic_session
  belongs_to :expert, class_name: 'User', foreign_key: 'expert_id'
  
  # Validations
  validates :description, presence: true
  validates :verified, :accepted, inclusion: { in: [true, false] }
  validates :diagnostic_session_id, presence: true, uniqueness: true
  validates :severity, inclusion: { in: SEVERIES, message: "%{value} is not a valid severity" }, allow_blank: true
  validates :estimated_repair_cost, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :estimated_repair_time, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
  
  # Scopes
  scope :verified, -> { where(verified: true) }
  scope :accepted, -> { where(accepted: true) }
  scope :pending_review, -> { where(verified: false) }
  scope :by_severity, ->(severity) { where(severity: severity) }
  
  # Instance methods
  def mark_as_verified!(verified_by)
    update(verified: true, expert: verified_by)
  end
  
  def mark_as_accepted!
    update(accepted: true)
  end
  
  def status
    return 'pending' unless verified
    accepted ? 'accepted' : 'rejected'
  end
  
  def formatted_verification_info
    return 'Not verified' unless verified
    "Verified by: #{expert&.full_name || 'System'} on #{updated_at.strftime('%Y-%m-%d')}"
  end
end
