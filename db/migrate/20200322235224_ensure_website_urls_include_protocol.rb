class EnsureWebsiteUrlsIncludeProtocol < ActiveRecord::Migration[6.0]
  def change
      Restaurant.all.each do |restaurant|
        restaurant.save! # re-run before_save to kick in sanitizer
      end
  end
end
