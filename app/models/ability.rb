# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    user ||= User.new # guest user (not logged in)
    
    if user.admin?
      can :manage, :all
    else
      can [:read, :new, :create], Restaurant
      can [:read, :new, :create], Location
      can [:new, :create, :thank_you], Ticket
      can :read, Category
    end

  end
end
