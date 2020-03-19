class Location < ApplicationRecord
  belongs_to :restaurant

  validates :address, uniqueness: true
end
