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

  def self.import(file)
    CSV.foreach(file.path, headers:true) do |row|
      id = row['id']
      restaurant = Restaurant.find_by(id: id)
      if restaurant.nil?
        new_restaurant = row.to_hash
        new_restaurant.delete("id")
        Restaurant.create new_restaurant        
      else
        restaurant.update row.to_hash
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
