# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Create initial admin user if it doesn't exist
admin_email = 'admin@example.com'
admin_password = 'password123' # In production, this should be changed immediately

unless User.exists?(email: admin_email)
  User.create!(
    email: admin_email,
    password: admin_password,
    password_confirmation: admin_password,
    role: 'admin'
  )
  puts "Created admin user with email: #{admin_email}"
else
  puts "Admin user already exists with email: #{admin_email}"
end

# Add any other seed data below this line
