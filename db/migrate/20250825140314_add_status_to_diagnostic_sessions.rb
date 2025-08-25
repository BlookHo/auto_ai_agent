class AddStatusToDiagnosticSessions < ActiveRecord::Migration[7.1]
  def change
    add_column :diagnostic_sessions, :status, :integer, default: 0, null: false
  end
end
