class Location < ApplicationRecord
  include UrlHelper
  belongs_to :restaurant

  validates :address, presence: true, uniqueness: true

  before_save :ensure_links_have_protocol

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
