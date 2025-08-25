class AddNameSurnameNickToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :name, :string
    add_column :users, :surname, :string
    add_column :users, :nick, :string
  end
end
