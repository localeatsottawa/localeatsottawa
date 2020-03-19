class Restaurant < ApplicationRecord
  has_many :locations

  validates :name, presence: true

  scope :alphabetical, -> { order(name: :asc)}
end
