class Location < ApplicationRecord
  belongs_to :restaurant

  validates :address, presence: true, uniqueness: true
end
