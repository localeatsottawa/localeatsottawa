class Restaurant < ApplicationRecord
  before_save :ensure_url_has_protocol
  
  has_many :locations, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  scope :alphabetical, -> { order(name: :asc)}
  
  private
  
  def ensure_url_has_protocol
    if ( self.website !~ /^https?:\/\// && !self.website.to_s.strip.empty? )
      self.website = "http://" + self.website
    end
  end
end
