class DiagnosticSession < ApplicationRecord
  # Associations
  belongs_to :car
  has_one :diag, dependent: :destroy
  has_many :symptoms, through: :car
  
  # Delegations
  delegate :user, to: :car
  
  # Validations
  validates :symptoms, presence: true
  validates :car_id, presence: true
  validates :vehicle_make, presence: true
  validates :vehicle_model, presence: true
  validates :vehicle_year, presence: true,
                         numericality: { only_integer: true,
                                        greater_than: 1900,
                                        less_than_or_equal_to: Time.current.year + 1 }

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
