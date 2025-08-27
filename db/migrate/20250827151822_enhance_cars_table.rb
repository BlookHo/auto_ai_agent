class EnhanceCarsTable < ActiveRecord::Migration[7.1]
  def change
    change_table :cars do |t|
      t.string :trim
      t.string :engine_type
      t.string :transmission_type
      t.string :fuel_type
      t.integer :mileage
      t.string :license_plate
      t.string :vehicle_type
      t.date :registration_date
      t.date :insurance_expiry
      t.text :notes
      
      # Add indexes for performance
      t.index :vin, unique: true
      t.index :license_plate, unique: true
    end
  end
end
