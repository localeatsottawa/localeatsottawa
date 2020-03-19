class CreateLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :address
      t.boolean :pickup
      t.boolean :delivery
      t.boolean :skip_the_dishes
      t.boolean :uber_eats
      t.boolean :foodora
      t.boolean :door_dash
      t.belongs_to :restaurant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
