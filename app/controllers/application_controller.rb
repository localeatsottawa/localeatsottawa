class ApplicationController < ActionController::Base
  include SessionsHelper
  before_action :load_user_info_into_gon

  def load_user_info_into_gon
    gon.push({
      admin: admin?
    })
  end
end
