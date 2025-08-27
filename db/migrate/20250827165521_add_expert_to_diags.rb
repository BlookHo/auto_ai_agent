class AddExpertToDiags < ActiveRecord::Migration[7.1]
  def change
    add_reference :diags, :expert, null: true, foreign_key: { to_table: :users }
  end
end
