class Location < ApplicationRecord
  require 'csv'

  belongs_to :restaurant

  validates :address, presence: true, uniqueness: true

  def self.import(file)
    attributes_whitelist = ["address", "pickup", "delivery", "skip_the_dishes", 
    "door_dash", "phone", "website", "pickup_url", "delivery_url", "skip_the_dishes_url", "door_dash_url"]
    CSV.foreach(file.path, headers:true) do |row|
      id = row['id']
      location_attributes = row.to_hash.keep_if {|key,value| attributes_whitelist.include? key}
      location = Location.find_by(id: id)
      if location.nil?
        restaurant_name = row["restaurant_name"]
        restaurant = Restaurant.find_by(name: restaurant_name)
        if restaurant.nil?
        else
          new_location = Location.new(location_attributes)
          new_location.restaurant = restaurant
          new_location.save
        end
      else
        location.update location_attributes
      end
    end
  end

end
