Rails.application.routes.draw do
  root 'restaurants#index'
  
  devise_for :users
  
  resources :restaurants do
    resources :locations
  end
end
