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

ActiveRecord::Schema.define(version: 2022_03_28_123108) do

  create_table "movies", primary_key: "uid", id: :string, charset: "utf8mb4", force: :cascade do |t|
    t.text "title", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["uid"], name: "index_movies_on_uid", unique: true
  end

  create_table "playlists", charset: "utf8mb4", force: :cascade do |t|
    t.string "user_id"
    t.string "movie_id"
    t.boolean "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", primary_key: "uid", id: :string, charset: "utf8mb4", force: :cascade do |t|
    t.string "mail", null: false
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["mail"], name: "index_users_on_mail", unique: true
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

end
