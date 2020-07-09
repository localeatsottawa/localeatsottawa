class Location < ApplicationRecord
  require 'csv'

  include UrlHelper

  belongs_to :restaurant

  validates :address, presence: true, uniqueness: true

  before_save :ensure_links_have_protocol

  def self.import(file)
    attributes_whitelist = ["address", "pickup", "delivery", "skip_the_dishes", "uber_eats", 
    "door_dash", "phone", "website", "pickup_url", "delivery_url", "skip_the_dishes_url", "uber_eats_url", "door_dash_url"]
    CSV.foreach(file.path, headers:true) do |row|
      id = row['id']
      location_attributes = row.to_hash.keep_if {|key,value| attributes_whitelist.include? key}
      location = Location.find_by(id: id)
      if location.nil?
        restaurant_name = row["restaurant_name"]
        restaurant = Restaurant.find_by(name: restaurant_name)
        if restaurant
          new_location = Location.new(location_attributes)
          new_location.restaurant = restaurant
          new_location.save
        end
      else
        location.update location_attributes
      end
    end
  end

  private
  
    def ensure_links_have_protocol
      self.website = self.ensure_url_has_protocol(self.website)
      self.pickup_url = self.ensure_url_has_protocol(self.pickup_url)
      self.delivery_url = self.ensure_url_has_protocol(self.delivery_url)
      self.skip_the_dishes_url = self.ensure_url_has_protocol(self.skip_the_dishes_url)
      self.uber_eats_url = self.ensure_url_has_protocol(self.uber_eats_url)
      self.door_dash_url = self.ensure_url_has_protocol(self.door_dash_url)
    end

end
