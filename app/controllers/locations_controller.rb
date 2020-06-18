class LocationsController < ApplicationController
  load_and_authorize_resource :restaurant, except: [:import]
  load_and_authorize_resource through: :restaurant, except: [:import]

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
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

  def import
    authorize! :import, :locations
    if request.post?
      Location.import(params[:file])
      redirect_to restaurants_path, notice: 'Locations data updated from CSV!'
    end
  end

  private
    def location_params
      params.require(:location).permit(:name,
                                       :address,
                                       :pickup,
                                       :pickup_url,
                                       :delivery,
                                       :delivery_url,
                                       :skip_the_dishes,
                                       :skip_the_dishes_url, 
                                       :uber_eats,
                                       :uber_eats_url,
                                       :foodora,
                                       :foodora_url,
                                       :door_dash,
                                       :door_dash_url,
                                       :phone,
                                       :website)
    end
end
