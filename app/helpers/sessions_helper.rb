module SessionsHelper
  def admin?
    current_user && current_user.admin?
  end
end