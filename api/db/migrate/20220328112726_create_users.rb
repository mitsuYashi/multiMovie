class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: false do |t|
      t.string :uid, null: false, primary_key: true
      t.string :mail, null: false
      t.string :name, null: false

      t.timestamps
    end
    add_index :users, :uid, unique: true
    add_index :users, :mail, unique: true
  end
end
