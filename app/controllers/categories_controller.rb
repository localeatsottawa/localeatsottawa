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

end
