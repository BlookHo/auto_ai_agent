class Car < ApplicationRecord
  # Associations
  belongs_to :user
  has_many :diagnostic_sessions, dependent: :destroy
  has_many :symptoms, dependent: :destroy

  # Validations
  validates :manufacturer, :model, :production_date, :vin, :color, presence: true
  validates :vin, uniqueness: true, length: { is: 17 }
  validate :production_date_not_in_future

  # Scopes
  scope :by_manufacturer, ->(manufacturer) { where('LOWER(manufacturer) LIKE ?', "%#{manufacturer.downcase}%") }
  scope :by_model, ->(model) { where('LOWER(model) LIKE ?', "%#{model.downcase}%") }
  scope :by_color, ->(color) { where('LOWER(color) = ?', color.downcase) }

  def display_name
    "#{manufacturer} #{model} (#{production_date.year})"
  end

  private

  def production_date_not_in_future
    return if production_date.blank?
    
    if production_date > Date.current
      errors.add(:production_date, "can't be in the future")
    end
  end
end
