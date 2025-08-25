class CreateDiags < ActiveRecord::Migration[7.1]
  def change
    create_table :diags do |t|
      t.text :description
      t.boolean :verified
      t.boolean :accepted

      t.timestamps
    end
  end
end
