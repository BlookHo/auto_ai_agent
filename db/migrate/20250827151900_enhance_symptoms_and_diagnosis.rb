class EnhanceSymptomsAndDiagnosis < ActiveRecord::Migration[7.1]
  def up
    # Create enum type for symptom categories
    execute <<-SQL
      CREATE TYPE symptom_category AS ENUM (
        'engine', 'transmission', 'electrical', 
        'brakes', 'suspension', 'exhaust', 
        'climate', 'safety', 'other'
      );
    SQL

    # Add columns to symptoms table
    change_table :symptoms do |t|
      t.column :category, :symptom_category, default: 'other', null: false
      t.string :severity, limit: 20
      t.boolean :warning_light
      t.string :warning_light_code
      t.string :frequency
      t.string :driving_conditions
    end

    # Add index on category
    add_index :symptoms, :category

    # Add columns to diagnostic_sessions table
    change_table :diagnostic_sessions do |t|
      t.jsonb :diagnostic_codes, default: []
      t.string :diagnosis_status, default: 'awaiting_analysis'
      t.float :confidence_score
      t.jsonb :ai_suggestions, default: {}
      t.references :assigned_expert, foreign_key: { to_table: :users }
      t.timestamp :diagnosed_at
      t.timestamp :resolved_at
    end

    # Add index on diagnosis_status for faster filtering
    add_index :diagnostic_sessions, :diagnosis_status

    # Add columns to diags table
    change_table :diags do |t|
      t.text :recommended_actions
      t.text :parts_needed
      t.decimal :estimated_repair_cost, precision: 10, scale: 2
      t.integer :estimated_repair_time  # in minutes
      t.string :severity  # minor, moderate, critical
    end
  end

  def down
    # Remove columns from diags table
    change_table :diags do |t|
      t.remove :recommended_actions
      t.remove :parts_needed
      t.remove :estimated_repair_cost
      t.remove :estimated_repair_time
      t.remove :severity
    end

    # Remove columns from diagnostic_sessions table
    change_table :diagnostic_sessions do |t|
      t.remove :diagnostic_codes
      t.remove :diagnosis_status
      t.remove :confidence_score
      t.remove :ai_suggestions
      t.remove_reference :assigned_expert
      t.remove :diagnosed_at
      t.remove :resolved_at
    end

    # Remove columns from symptoms table
    change_table :symptoms do |t|
      t.remove :severity
      t.remove :warning_light
      t.remove :warning_light_code
      t.remove :frequency
      t.remove :driving_conditions
    end

    # Remove the category column and type
    remove_column :symptoms, :category
    execute 'DROP TYPE symptom_category;'
  end
end
