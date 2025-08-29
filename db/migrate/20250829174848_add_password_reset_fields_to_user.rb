class AddPasswordResetFieldsToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    
    add_index :users, :reset_password_token, unique: true
    # Removed duplicate email index as it already exists
  end
end
