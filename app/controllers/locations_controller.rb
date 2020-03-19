class LocationsController < ApplicationController
  load_and_authorize_resource :restaurant
  load_and_authorize_resource through: :restaurant

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    @location = Location.new(location_params)

    if @location.save
      redirect_to restaurants_path, notice: 'Location was successfully created.'
    else
      render :new
    end
  end

  def update
    if @location.update(location_params)
      redirect_to restaurants_path, notice: 'Location was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @location.destroy
    redirect_to restaurants_path, notice: 'Location was successfully destroyed.'
  end

  private
    def location_params
      params.require(:location).permit(:name, :address, :pickup, :delivery, :skip_the_dishes, :uber_eats, :foodora, :door_dash, :restaurant_id)
    end
end
