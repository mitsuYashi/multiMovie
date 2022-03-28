class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies, id: false do |t|
      t.string :uid, null: false ,primary_key: true
      t.text :title, null: false

      t.timestamps
    end
    add_index :movies, :uid, unique: true
  end
end
