class AddUserIdToCars < ActiveRecord::Migration[7.1]
  def up
    # First add the column as nullable
    add_reference :cars, :user, foreign_key: true
    
    # Update existing records with a default user (admin)
    admin = User.find_by(email: 'admin@example.com') || User.first
    if admin
      Car.update_all(user_id: admin.id)
    else
      # If no users exist yet, create one
      admin = User.create!(
        email: 'admin@example.com',
        password: 'password',
        password_confirmation: 'password',
        role: 'admin',
        name: 'Admin',
        surname: 'User',
        nick: 'admin'
      )
      Car.update_all(user_id: admin.id)
    end
    
    # Now add the not-null constraint
    change_column_null :cars, :user_id, false
  end
  
  def down
    remove_reference :cars, :user, foreign_key: true
  end
end
