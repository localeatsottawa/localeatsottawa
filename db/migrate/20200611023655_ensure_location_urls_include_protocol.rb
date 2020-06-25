class EnsureLocationUrlsIncludeProtocol < ActiveRecord::Migration[6.0]
  def up
    Location.all.each do |location|
      location.save!
    end
  end
  def down
  end
end
