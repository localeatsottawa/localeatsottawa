class Restaurant < ApplicationRecord
  has_many :locations, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  scope :alphabetical, -> { order(name: :asc)}
end
