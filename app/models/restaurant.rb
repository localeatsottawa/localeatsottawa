class Restaurant < ApplicationRecord
  has_many :locations, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  scope :alphabetical, -> { order(name: :asc)}
  
  def website
    ensure_url_has_protocol read_attribute(:website)
  end
  
  private
  
  def ensure_url_has_protocol(website)
    if ( website !~ /https?:\/\// && !website.to_s.strip.empty? )
      "http://" + website
    else
      website
    end
  end
end
