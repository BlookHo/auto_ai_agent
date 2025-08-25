class CreateCars < ActiveRecord::Migration[7.1]
  def change
    create_table :cars do |t|
      t.string :manufacturer
      t.string :model
      t.datetime :production_date
      t.string :vin
      t.string :color

      t.timestamps
    end
  end
end
