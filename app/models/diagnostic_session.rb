class DiagnosticSession < ApplicationRecord
  # Constants
  DIAGNOSIS_STATUSES = %w[awaiting_analysis in_progress pending_review confirmed].freeze
  
  # JSON fields are handled natively by PostgreSQL jsonb type
  
  # Associations
  belongs_to :car
  belongs_to :assigned_expert, class_name: 'User', optional: true
  belongs_to :diag, optional: true
  has_many :symptoms, through: :car
  
  # Delegations
  delegate :user, to: :car
  
  # Validations
  validates :car_id, presence: true
  validates :diagnosis_status, inclusion: { in: DIAGNOSIS_STATUSES }
  validates :confidence_score, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }, allow_nil: true

  # Callbacks
  before_validation :set_default_status, on: :create

  # Enums
  enum status: { pending: 0, in_progress: 1, completed: 2, cancelled: 3 }

  # Scopes
  scope :recent, -> { order(created_at: :desc) }
  scope :by_status, ->(status) { where(status: status) }

  # Class methods
  def self.common_car_makes
    [
      'Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 
      'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Genesis', 'GMC', 'Honda', 
      'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 
      'Lexus', 'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'MINI', 'Mitsubishi', 
      'Nissan', 'Porsche', 'RAM', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
    ]
  end

  # Instance methods
  def vehicle_info
    car&.display_name || 'No car associated'
  end

  # Get a diagnosis from the LLM
  def generate_diagnosis
    return if symptoms.blank? || vehicle_make.blank? || vehicle_model.blank? || vehicle_year.blank?
    
    # Use the LLM service to generate a diagnosis
    llm_service = LlmService.new(llm_provider)
    self.diagnosis = llm_service.diagnose_car_problem(
      vehicle_make,
      vehicle_model,
      vehicle_year,
      symptoms
    )
    save
  end

  private

  def set_default_status
    self.status ||= :pending
  end

  attr_accessor :llm_provider
end
