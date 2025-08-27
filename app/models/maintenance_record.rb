class MaintenanceRecord < ApplicationRecord
  # Associations
  belongs_to :car
  belongs_to :performed_by, class_name: 'User', optional: true
  
  # receipts is a JSONB column in PostgreSQL
  
  # Validations
  validates :service_type, :performed_on, presence: true
  validates :cost, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :mileage, numericality: { only_integer: true, greater_than: 0 }, allow_nil: true
  
  # Scopes
  scope :recent, -> { order(performed_on: :desc) }
  scope :by_service_type, ->(type) { where(service_type: type) }
  scope :warranty_covered, -> { where(warranty_covered: true) }
  
  # Instance methods
  def formatted_cost
    return 'N/A' unless cost.present?
    "$#{'%.2f' % cost}"
  end
  
  def formatted_performed_on
    performed_on&.strftime('%B %d, %Y') || 'N/A'
  end
  
  def add_receipt(receipt_data)
    self.receipts ||= []
    self.receipts << receipt_data
    save
  end
  
  def remove_receipt(receipt_index)
    return false unless receipts[receipt_index].present?
    
    self.receipts.delete_at(receipt_index)
    save
  end
end
