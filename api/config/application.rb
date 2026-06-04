require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"

Bundler.require(*Rails.groups)

module Api
  class Application < Rails::Application
    config.load_defaults 7.1
    config.api_only = true
    config.require_master_key = false
    config.time_zone = "Tokyo"
    config.active_storage.variant_processor = :mini_magick
  end
end
