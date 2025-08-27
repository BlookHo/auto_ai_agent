class CreateCauses < ActiveRecord::Migration[7.1]
  def change
    create_table :causes do |t|
      t.references :diag, null: false, foreign_key: true, index: { unique: true }
      t.text :description

      t.timestamps
    end
  end
end
