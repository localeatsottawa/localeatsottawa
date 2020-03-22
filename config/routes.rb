Rails.application.routes.draw do
  root 'restaurants#index'
  
  devise_for :users
  
  resources :restaurants do
    resources :locations
  end

  namespace :api do
    namespace :v1 do
      resources :restaurants, only: [:index]
    end
  end
end
