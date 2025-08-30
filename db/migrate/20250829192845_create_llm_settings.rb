class CreateLlmSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :llm_settings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :provider, null: false, default: 'openai'
      t.text :api_key, null: true
      t.string :model, null: false, default: 'gpt-4'
      t.decimal :temperature, precision: 3, scale: 2, default: 0.7

      t.timestamps
    end

    # Add index for faster lookups
    add_index :llm_settings, [:user_id, :provider], unique: true
  end
end
