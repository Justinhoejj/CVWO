class ApplicationController < ActionController::Base
    # ensure user is signned in to use app
    before_action :authenticate_user!
end
