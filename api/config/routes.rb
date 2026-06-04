Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resource :site_setting, only: %i[show update]
      resources :pricing_plans, only: %i[index show]
      resources :transformations, only: %i[index show]
      resources :testimonials, only: %i[index show]
      resources :contact_inquiries, only: %i[create]

      namespace :admin do
        post "login", to: "sessions#create"
        resource :site_setting, only: %i[show update]
        resources :pricing_plans
        resources :transformations
        resources :testimonials
        resources :contact_inquiries, only: %i[index show update destroy]
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check

  root "spa#show"
  get "*path", to: "spa#show", constraints: lambda { |req|
    req.path.exclude?("rails/") && !req.path.start_with?("/api/")
  }
end
