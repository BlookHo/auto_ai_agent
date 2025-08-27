# This file should ensure the existence of records required to run the application in every environment
# The code here is idempotent and can be executed at any point in every environment.

puts "Seeding database..."

# Clear existing data (in development only)
if Rails.env.development?
  puts "Clearing existing data..."
  [MaintenanceRecord, Diag, Symptom, DiagnosticSession, Car, User].each do |model|
    model.destroy_all
  end
  puts "Database cleared."
end

# Create Users
puts "Creating users..."
users = [
  { email: 'admin@example.com', password: 'password123', name: 'Admin', surname: 'User', role: 'admin' },
  { email: 'expert@example.com', password: 'password123', name: 'Expert', surname: 'User', role: 'expert' },
  { email: 'user@example.com', password: 'password123', name: 'Regular', surname: 'User', role: 'expert' }
]

users.each do |user_attrs|
  unless User.exists?(email: user_attrs[:email])
    User.create!(user_attrs)
    puts "Created #{user_attrs[:role]} user: #{user_attrs[:email]}"
  end
end

admin = User.find_by(email: 'admin@example.com')
expert = User.find_by(email: 'expert@example.com')
user = User.find_by(email: 'user@example.com')

# Create Cars
puts "Creating cars..."
cars = [
  {
    user: user,
    manufacturer: 'Toyota',
    model: 'Camry',
    production_date: '2020-01-01',
    color: 'Silver',
    trim: 'XLE',
    engine_type: 'V6 3.5L',
    transmission_type: 'Automatic',
    fuel_type: 'Gasoline',
    mileage: 35000,
    license_plate: 'ABC123',
    vehicle_type: 'Sedan',
    registration_date: 1.year.ago,
    insurance_expiry: 11.months.from_now,
    notes: 'Regular maintenance performed',
    vin: '4T1BF1FK0CU123456'
  },
  {
    user: user,
    manufacturer: 'Honda',
    model: 'CR-V',
    production_date: '2019-01-01',
    color: 'Blue',
    trim: 'EX-L',
    engine_type: 'I4 2.4L',
    transmission_type: 'CVT',
    fuel_type: 'Gasoline',
    mileage: 42000,
    license_plate: 'XYZ789',
    vehicle_type: 'SUV',
    registration_date: 11.months.ago,
    insurance_expiry: 1.month.from_now,
    notes: 'Needs oil change soon',
    vin: '5J6RE4H43BL123456'
  }
]

created_cars = cars.map { |car_attrs| Car.create!(car_attrs) }
puts "Created #{created_cars.size} cars"

# Create Symptoms
puts "Creating symptoms..."
symptoms = [
  { 
    description: 'Engine makes knocking sound when accelerating',
    car: created_cars.first,
    author: user,
    category: 'engine',
    severity: 'high',
    frequency: 'constant',
    driving_conditions: 'When engine is under load',
    warning_light: true,
    warning_light_code: 'P0325'
  },
  {
    description: 'Brakes squeaking when coming to a stop',
    car: created_cars.first,
    author: user,
    category: 'brakes',
    severity: 'medium',
    frequency: 'intermittent',
    driving_conditions: 'During light braking',
    warning_light: false
  },
  {
    description: 'Check engine light is on',
    car: created_cars.first,
    author: user,
    category: 'engine',
    severity: 'high',
    frequency: 'constant',
    driving_conditions: 'All driving conditions',
    warning_light: true,
    warning_light_code: 'P0420'
  }
]

created_symptoms = symptoms.map { |symptom_attrs| Symptom.create!(symptom_attrs) }
puts "Created #{created_symptoms.size} symptoms"

# Create Diagnostic Sessions
puts "Creating diagnostic sessions..."
diagnostic_sessions = [
  {
    car: created_cars.first,
    symptom_id: created_symptoms[0].id,
    diagnosis: 'Potential engine knock and catalytic converter efficiency below threshold',
    diagnostic_codes: ['P0325', 'P0420'].to_json,
    diagnosis_status: 'confirmed',
    confidence_score: 0.85,
    ai_suggestions: [
      'Check engine oil level and quality',
      'Inspect spark plugs and ignition system',
      'Check catalytic converter and oxygen sensors'
    ].to_json,
    diagnosed_at: 1.day.ago,
    resolved_at: Time.current,
    assigned_expert_id: expert.id
  },
  {
    car: created_cars.first,
    symptom_id: created_symptoms[1].id,
    diagnosis_status: 'in_progress',
    diagnosed_at: Time.current,
    assigned_expert_id: expert.id
  }
]

created_sessions = diagnostic_sessions.map { |session_attrs| DiagnosticSession.create!(session_attrs) }
puts "Created #{created_sessions.size} diagnostic sessions"

# Create Diags
puts "Creating diagnoses..."

# First diag for the first diagnostic session
diag1 = Diag.create!(
  description: 'Faulty knock sensor and catalytic converter efficiency below threshold',
  recommended_actions: '1. Replace knock sensor\n2. Inspect catalytic converter and oxygen sensors\n3. Check for any exhaust leaks',
  parts_needed: 'Knock sensor, exhaust gaskets',
  estimated_repair_cost: 1200.00,
  estimated_repair_time: 4,
  severity: 'moderate',
  verified: true,
  accepted: true,
  expert: expert
)

# Create causes for each diag
cause1 = Cause.create!(
  diag: diag1,
  description: 'The knock sensor has failed, and the catalytic converter is not operating at optimal efficiency. This could be due to prolonged use of low-quality fuel, oil contamination, or normal wear and tear.'
)

# Second diag for the second diagnostic session
diag2 = Diag.create!(
  description: 'Worn brake pads and rotors',
  recommended_actions: '1. Replace front brake pads and rotors\n2. Inspect brake calipers and hardware\n3. Bleed brake system if necessary',
  parts_needed: 'Brake pads, rotors, brake fluid',
  estimated_repair_cost: 450.00,
  estimated_repair_time: 2,
  severity: 'minor',
  verified: false,
  accepted: false,
  expert: expert
)

# Create causes for each diag
cause2 = Cause.create!(
  diag: diag2,
  description: 'The brake pads and rotors have reached the end of their service life due to normal wear and tear. This is a standard maintenance item that needs periodic replacement.'
)

# Update the diagnostic sessions with their respective diags
created_sessions[0].update(diag: diag1)
created_sessions[1].update(diag: diag2)

created_diags = [diag1, diag2]
puts "Created #{created_diags.size} diagnoses with their causes"

# Create Maintenance Records
puts "Creating maintenance records..."
maintenance_records = [
  {
    car: created_cars.first,
    service_type: :oil_change,
    performed_on: 3.months.ago,
    mileage: 32000,
    cost: 89.99,
    description: 'Synthetic oil change and filter replacement',
    warranty_covered: false,
    receipts: [
      { type: 'receipt', url: 'https://example.com/receipts/1.pdf', amount: 89.99, date: 3.months.ago }
    ],
    service_center: 'Quick Lube Pro - Downtown',
    performed_by: expert,
    notes: 'Next oil change due in 6 months or 5,000 miles'
  },
  {
    car: created_cars.first,
    service_type: :tire_rotation,
    performed_on: 2.months.ago,
    mileage: 33500,
    cost: 29.99,
    description: 'Tire rotation and pressure check',
    warranty_covered: true,
    receipts: [
      { type: 'receipt', url: 'https://example.com/receipts/2.pdf', amount: 29.99, date: 2.months.ago }
    ],
    service_center: 'Tire Masters - Main Street',
    performed_by: admin,
    notes: 'Tires wearing evenly, alignment looks good'
  }
]

created_maintenance = maintenance_records.map { |record_attrs| MaintenanceRecord.create!(record_attrs) }
puts "Created #{created_maintenance.size} maintenance records"

puts "\nSeeding complete!"
puts "You can now log in with:"
puts "- Admin: admin@example.com / password123"
puts "- Expert: expert@example.com / password123"
puts "- User: user@example.com / password123"
