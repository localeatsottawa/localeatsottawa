class CreateCategoriesRestaurantsJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :categories, :restaurants
  end
end
