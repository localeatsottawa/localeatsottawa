class CategoriesController < ApplicationController
  load_and_authorize_resource

  def index
    if params[:featured] == 'true'
      @categories = @categories.where('featured = ?', true)
    end
    if params[:selected_category_id].present?
      @categories = @categories.or(Category.where(id: params[:selected_category_id]))
    end
    
    respond_to do | format | 
      format.html
      format.json
    end
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    if @category.save
      redirect_to @category, notice: 'Category was successfully created.'
    else
      render :new
    end
  end

  def update
    if @category.update(category_params)
      redirect_to @category, notice: 'Category was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @category.destroy
    redirect_to categories_url, notice: 'Category was successfully destroyed.'
  end

  private
    def category_params
      params.require(:category).permit(:name, :emoji, :featured)
    end
end
