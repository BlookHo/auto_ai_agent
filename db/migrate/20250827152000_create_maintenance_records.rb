class CreateMaintenanceRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :maintenance_records do |t|
      t.references :car, null: false, foreign_key: true
      t.string :service_type, null: false
      t.text :description
      t.decimal :cost, precision: 10, scale: 2
      t.integer :mileage
      t.date :performed_on, null: false
      t.string :service_center
      t.text :notes
      t.jsonb :receipts, default: []
      t.boolean :warranty_covered, default: false
      t.references :performed_by, foreign_key: { to_table: :users }

      t.timestamps
    end

    # Add index for common queries
    add_index :maintenance_records, :service_type
    add_index :maintenance_records, :performed_on
    add_index :maintenance_records, :mileage
  end
end
