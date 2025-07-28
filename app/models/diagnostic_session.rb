class DiagnosticSession < ApplicationRecord
  # Validations
  validates :vehicle_make, presence: true
  validates :vehicle_model, presence: true
  validates :vehicle_year, presence: true,
                         numericality: { only_integer: true,
                                        greater_than: 1900,
                                        less_than_or_equal_to: Time.current.year + 1 }
  validates :symptoms, presence: true

  attr_accessor :llm_provider

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

  # Return a list of common car makes for the form
  def self.common_car_makes
    [
      'Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Buick', 'Cadillac', 'Chevrolet', 
      'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Genesis', 'GMC', 'Honda', 
      'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover', 
      'Lexus', 'Lincoln', 'Maserati', 'Mazda', 'Mercedes-Benz', 'MINI', 'Mitsubishi', 
      'Nissan', 'Porsche', 'RAM', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
    ]
  end
end
