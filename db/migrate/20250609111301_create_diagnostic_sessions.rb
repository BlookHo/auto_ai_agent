class CreateDiagnosticSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :diagnostic_sessions do |t|
      t.string :vehicle_make
      t.string :vehicle_model
      t.integer :vehicle_year
      t.text :symptoms
      t.text :diagnosis

      t.timestamps
    end
  end
end
