class PagesController < ApplicationController
  def home
    @restaurants = Restaurant.all.alphabetical
  end
end
