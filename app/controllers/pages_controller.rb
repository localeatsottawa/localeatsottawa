class PagesController < ApplicationController
  def admin_menu
    authorize! :view, :admin_menu
  end
  
end
