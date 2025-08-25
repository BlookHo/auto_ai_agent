class CreateSymptoms < ActiveRecord::Migration[7.1]
  def change
    create_table :symptoms do |t|
      t.text :description
      t.integer :author_id
      t.integer :car_id

      t.timestamps
    end
  end
end
