Rails.application.routes.draw do
  # Serve React app for all routes except API endpoints
  get '/diagnostic', to: 'application#index'
  get '/diagnostic/new', to: 'application#index'
  
  # API endpoints
  # Handle CORS preflight requests
  match '*all', to: 'application#preflight', via: [:options]
  
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post 'auth/register', to: 'auth#register'
      post 'auth/login', to: 'auth#login'
      get 'auth/me', to: 'auth#me'
      match 'auth/*path', to: 'auth#preflight', via: [:options]
      
      # Protected resources
      resources :diagnostics, only: [:index, :create, :show], path: 'diagnostic'
      resources :users, except: [:new, :edit]
    end
  end
  
  # Set root to serve the React app
  root 'application#index'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check
  
  # Catch-all route for React Router
  get '*path', to: 'application#index', constraints: ->(req) do
    !req.path.start_with?('/rails/') && !req.path.start_with?('/api/')
  end
end
