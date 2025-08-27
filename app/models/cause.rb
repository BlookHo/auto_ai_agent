class Cause < ApplicationRecord
  # Associations
  belongs_to :diag

  # Validations
  validates :description, presence: true
  validates :diag, presence: true, uniqueness: true

  # Callbacks
  after_initialize :set_defaults, if: :new_record?

  private

  def set_defaults
    self.description ||= 'No cause specified' if description.blank?
  end
end
