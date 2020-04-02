class AddLinksToLocations < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :pickup_url, :string
    add_column :locations, :delivery_url, :string
    add_column :locations, :skip_the_dishes_url, :string
    add_column :locations, :uber_eats_url, :string
    add_column :locations, :foodora_url, :string
    add_column :locations, :door_dash_url, :string
  end
end
