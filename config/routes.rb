Rails.application.routes.draw do
  root 'pages#index'
    namespace :api do
      namespace :v1 do
        resources :tasks
        resources :tags
        resources :taggings, only: [:create, :destroy, :show]
      end
    end
  get '*path', to: 'pages#index', via: :all #redirects invalid page request to root for react-router compatability
end
