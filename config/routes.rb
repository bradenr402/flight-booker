Rails.application.routes.draw do
  # Defines the root path route ("/")
  root 'flights#index'

  resources :flights
  resources :bookings
  resources :passengers
end
