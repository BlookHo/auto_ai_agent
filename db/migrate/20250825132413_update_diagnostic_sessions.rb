class UpdateDiagnosticSessions < ActiveRecord::Migration[7.1]
  def change
    remove_column :diagnostic_sessions, :vehicle_make, :string
    remove_column :diagnostic_sessions, :vehicle_model, :string
    remove_column :diagnostic_sessions, :vehicle_year, :integer
    
    add_column :diagnostic_sessions, :car_id, :integer
    add_column :diagnostic_sessions, :diag_id, :integer
    add_column :diagnostic_sessions, :symptom_id, :integer
    
    add_index :diagnostic_sessions, :car_id
    add_index :diagnostic_sessions, :diag_id
    add_index :diagnostic_sessions, :symptom_id
  end
end
