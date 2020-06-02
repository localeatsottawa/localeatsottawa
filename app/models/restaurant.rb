class Restaurant < ApplicationRecord
  require 'csv'
  before_save :ensure_website_has_protocol
  
  has_many :locations, dependent: :destroy
  has_and_belongs_to_many :categories

  validates :name, presence: true, uniqueness: true

  scope :alphabetical, -> { order(name: :asc)}
  
  def category
    categories.first
  end
  
  def category_id
    category.try(:id)
  end
  
  def category_id=(category_id)
    categories.clear
    categories << Category.find(category_id)  
  end

  def self.find_categories_by_name(category_name)
    Category.where(name: category_name)
  end

  def self.import(file)
    CSV.foreach(file.path, headers:true) do |row|
      id = row['id']
      restaurant_from_csv = row.to_hash
      restaurant_from_csv.delete("id")
      categories_result = find_categories_by_name(row.values_at("category"))
      restaurant_from_csv.delete("category")
      restaurant = Restaurant.find_by(id: id)
      if restaurant.nil?
        new_restaurant = Restaurant.new
        new_restaurant = restaurant_from_csv        
        new_restaurant.categories = categories_result
        new_restaurant.save
      else
        restaurant.update restaurant_from_csv
        restaurant.categories = categories_result
      end
    end
  end
  
  private
  
    def ensure_website_has_protocol
      if ( self.website !~ /^https?:\/\// && !self.website.to_s.strip.empty? )
        self.website = "http://" + self.website
      end
    end
end
