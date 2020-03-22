class Api::V1::RestaurantsController < Api::V1::ApplicationController
  load_and_authorize_resource
  
  def index
    @restaurants = @restaurants.alphabetical
    
    respond_to do |format|
      format.json
    end
  end
  
end