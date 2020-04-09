class RestaurantsController < ApplicationController
  load_and_authorize_resource

  def index
    @restaurants = @restaurants.alphabetical

    @restaurants = @restaurants.joins(:locations)
  
    @restaurants = @restaurants.where('locations.pickup = ?', params[:pickup] == 'true')
    @restaurants = @restaurants.or(@restaurants.where('locations.delivery = ?', params[:delivery] == 'true'))
    @restaurants = @restaurants.or(@restaurants.where('locations.uber_eats = ?', params[:uber_eats] == 'true'))
    @restaurants = @restaurants.or(@restaurants.where('locations.skip_the_dishes = ?', params[:skip_the_dishes] == 'true'))
    @restaurants = @restaurants.or(@restaurants.where('locations.door_dash = ?', params[:door_dash] == 'true'))
    @restaurants = @restaurants.or(@restaurants.where('locations.foodora = ?', params[:foodora] == 'true'))

    @restaurants = @restaurants.includes(:locations)

    respond_to do |format|
      format.html { @landing_header = true }
      format.json
    end
  end

  def show
  end

  def new
    @restaurant = Restaurant.new
  end

  def edit
  end

  def create
    @restaurant = Restaurant.new(restaurant_params)

    if @restaurant.save
      redirect_to new_restaurant_location_path(@restaurant, from_restaurant_form: true), notice: 'Restaurant was successfully created.'
    else
      render :new
    end
  end

  def update
    if @restaurant.update(restaurant_params)
      redirect_to restaurants_path, notice: 'Restaurant was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @restaurant.destroy
    redirect_to restaurants_path, notice: 'Restaurant was successfully destroyed.'
  end

  private
    def restaurant_params
      params.require(:restaurant).permit(:name,
                                         :phone,
                                         :location,
                                         :website,
                                         :phone)
    end    
end
