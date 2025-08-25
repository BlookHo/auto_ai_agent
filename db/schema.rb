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

ActiveRecord::Schema[7.1].define(version: 2025_08_25_140314) do
  create_table "cars", force: :cascade do |t|
    t.string "manufacturer"
    t.string "model"
    t.datetime "production_date"
    t.string "vin"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["car_id"], name: "index_diagnostic_sessions_on_car_id"
    t.index ["diag_id"], name: "index_diagnostic_sessions_on_diag_id"
    t.index ["symptom_id"], name: "index_diagnostic_sessions_on_symptom_id"
  end

  create_table "diags", force: :cascade do |t|
    t.text "description"
    t.boolean "verified"
    t.boolean "accepted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "symptoms", force: :cascade do |t|
    t.text "description"
    t.integer "author_id"
    t.integer "car_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

end
