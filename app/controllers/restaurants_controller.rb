class RestaurantsController < ApplicationController
  load_and_authorize_resource

  def index
    # Force false condition to start since the rest are OR conditions
    @restaurants = @restaurants.joins(:locations).where(id: -1)
  
    if params[:pickup] == 'true'
      @restaurants = @restaurants.or(Restaurant.joins(:locations).where('locations.pickup = ?', true))
    end

    if params[:delivery] == 'true'
      @restaurants = @restaurants.or(Restaurant.joins(:locations).where('locations.delivery = ?', true))
    end

    if params[:uber_eats] == 'true'
      @restaurants = @restaurants.or(Restaurant.joins(:locations).where('locations.uber_eats = ?', true))
    end

    if params[:skip_the_dishes] == 'true'
      @restaurants = @restaurants.or(Restaurant.joins(:locations).where('locations.skip_the_dishes = ?', true))
    end

    if params[:door_dash] == 'true'
      @restaurants = @restaurants.or(Restaurant.joins(:locations).where('locations.door_dash = ?', true))
    end

    if params[:foodora] == 'true'
      @restaurants = @restaurants.or(Restaurant.joins(:locations).where('locations.foodora = ?', true))
    end

    if params[:category_id].present?
      @restaurants = @restaurants.joins(:categories_restaurants).where('categories_restaurants.category_id = ?', params[:category_id])
    end

    @restaurants = @restaurants.includes(:locations).alphabetical

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
                                         :phone,
                                         :category_id)
    end    
end
