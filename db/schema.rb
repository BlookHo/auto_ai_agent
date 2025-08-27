# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_08_27_152000) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "symptom_category", ["engine", "transmission", "electrical", "brakes", "suspension", "exhaust", "climate", "safety", "other"]

  create_table "cars", force: :cascade do |t|
    t.string "manufacturer"
    t.string "model"
    t.datetime "production_date"
    t.string "vin"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "trim"
    t.string "engine_type"
    t.string "transmission_type"
    t.string "fuel_type"
    t.integer "mileage"
    t.string "license_plate"
    t.string "vehicle_type"
    t.date "registration_date"
    t.date "insurance_expiry"
    t.text "notes"
    t.index ["license_plate"], name: "index_cars_on_license_plate", unique: true
    t.index ["vin"], name: "index_cars_on_vin", unique: true
  end

  create_table "diagnostic_sessions", force: :cascade do |t|
    t.text "symptoms"
    t.text "diagnosis"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "car_id"
    t.integer "diag_id"
    t.integer "symptom_id"
    t.integer "status", default: 0, null: false
    t.jsonb "diagnostic_codes", default: []
    t.string "diagnosis_status", default: "awaiting_analysis"
    t.float "confidence_score"
    t.jsonb "ai_suggestions", default: {}
    t.bigint "assigned_expert_id"
    t.datetime "diagnosed_at", precision: nil
    t.datetime "resolved_at", precision: nil
    t.index ["assigned_expert_id"], name: "index_diagnostic_sessions_on_assigned_expert_id"
    t.index ["car_id"], name: "index_diagnostic_sessions_on_car_id"
    t.index ["diag_id"], name: "index_diagnostic_sessions_on_diag_id"
    t.index ["diagnosis_status"], name: "index_diagnostic_sessions_on_diagnosis_status"
    t.index ["symptom_id"], name: "index_diagnostic_sessions_on_symptom_id"
  end

  create_table "diags", force: :cascade do |t|
    t.text "description"
    t.boolean "verified"
    t.boolean "accepted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "recommended_actions"
    t.text "parts_needed"
    t.decimal "estimated_repair_cost", precision: 10, scale: 2
    t.integer "estimated_repair_time"
    t.string "severity"
  end

  create_table "maintenance_records", force: :cascade do |t|
    t.bigint "car_id", null: false
    t.string "service_type", null: false
    t.text "description"
    t.decimal "cost", precision: 10, scale: 2
    t.integer "mileage"
    t.date "performed_on", null: false
    t.string "service_center"
    t.text "notes"
    t.jsonb "receipts", default: []
    t.boolean "warranty_covered", default: false
    t.bigint "performed_by_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_maintenance_records_on_car_id"
    t.index ["mileage"], name: "index_maintenance_records_on_mileage"
    t.index ["performed_by_id"], name: "index_maintenance_records_on_performed_by_id"
    t.index ["performed_on"], name: "index_maintenance_records_on_performed_on"
    t.index ["service_type"], name: "index_maintenance_records_on_service_type"
  end

  create_table "symptoms", force: :cascade do |t|
    t.text "description"
    t.integer "author_id"
    t.integer "car_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.enum "category", default: "other", null: false, enum_type: "symptom_category"
    t.string "severity", limit: 20
    t.boolean "warning_light"
    t.string "warning_light_code"
    t.string "frequency"
    t.string "driving_conditions"
    t.index ["category"], name: "index_symptoms_on_category"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "surname"
    t.string "nick"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "diagnostic_sessions", "users", column: "assigned_expert_id"
  add_foreign_key "maintenance_records", "cars"
  add_foreign_key "maintenance_records", "users", column: "performed_by_id"
end
