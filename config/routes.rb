Rails.application.routes.draw do
  root 'pages#home'
  
  devise_for :users
  
  resources :restaurants do
    resources :locations
  end
end
