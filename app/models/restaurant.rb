class Restaurant < ApplicationRecord
  require 'csv'
  include UrlHelper
  before_save :ensure_website_has_protocol
  
  has_many :locations, dependent: :destroy
  has_and_belongs_to_many :categories

  validates :name, presence: true, uniqueness: true

  scope :alphabetical, -> { order(name: :asc)}
  
  def category
    categories.first
  end

  def category=(category)
    categories.clear
    categories << category
  end
  
  def category_id
    category.try(:id)
  end
  
  def category_id=(category_id)
    categories.clear
    categories << Category.find(category_id)  
  end

  def self.import(file)
    attributes_whitelist = ["name", "phone", "website"]
    CSV.foreach(file.path, headers:true) do |row|
      id = row['id']
      category = Category.find_or_create_by(name: row['category'])
      restaurant_attributes = row.to_hash.keep_if {|key,value| attributes_whitelist.include? key }
      restaurant = Restaurant.find_by(id: id)
      if restaurant.nil?
        new_restaurant = Restaurant.new(restaurant_attributes)        
        new_restaurant.category = category
        new_restaurant.save
      else
        restaurant.update restaurant_attributes
        restaurant.category = category
      end
    end
  end
  
  private
  
    def ensure_website_has_protocol
      self.website = self.ensure_url_has_protocol(self.website)
    end
end
