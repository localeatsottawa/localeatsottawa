class AddContactInfoToLocations < ActiveRecord::Migration[6.0]
  def change
    add_column :locations, :phone, :string
    add_column :locations, :website, :string
  end
end
