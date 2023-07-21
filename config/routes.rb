Rails.application.routes.draw do
  root to: "pages#start"
  get "mixage/:unique_id", to: "pages#mixage", as: "unique_mixage"
  get "/api/check_transaction", to: "pages#check_transaction"
end
