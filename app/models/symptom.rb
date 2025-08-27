class Symptom < ApplicationRecord
  # Use the PostgreSQL enum type for category
  SEVERITIES = %w[low medium high critical].freeze
  FREQUENCIES = %w[constant intermittent occasional once].freeze
  
  # Associations
  belongs_to :car
  belongs_to :author, class_name: 'User', foreign_key: 'author_id'
  
  # Validations
  validates :description, presence: true, length: { minimum: 10, maximum: 1000 }
  validates :car_id, presence: true
  validates :author_id, presence: true
  # Category is validated by the PostgreSQL enum type
  validates :severity, inclusion: { in: SEVERITIES, message: "%{value} is not a valid severity" }, allow_blank: true
  validates :frequency, inclusion: { in: FREQUENCIES, message: "%{value} is not a valid frequency" }, allow_blank: true
  
  # Scopes
  scope :recent, -> { order(created_at: :desc) }
  scope :by_car, ->(car_id) { where(car_id: car_id) }
  scope :by_author, ->(user_id) { where(author_id: user_id) }
  
  # Instance methods
  def car_info
    car&.display_name || 'No car associated'
  end
  
  def author_name
    author&.full_name || 'Unknown'
  end
  
  def formatted_created_at
    created_at.strftime('%Y-%m-%d %H:%M')
  end
  
  def self.common_symptoms
    [
      'Engine makes unusual noises',
      'Check engine light is on',
      'Car won\'t start',
      'Brakes feel soft or spongy',
      'Steering wheel vibrates',
      'Car pulls to one side',
      'Transmission shifts hard',
      'Overheating engine',
      'Poor fuel economy',
      'Excessive exhaust smoke'
    ]
  end
end
