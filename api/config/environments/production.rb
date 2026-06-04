require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.secret_key_base = ENV.fetch("SECRET_KEY_BASE")
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false
  config.active_storage.service = :local
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")
  config.active_support.report_deprecations = false
  config.public_file_server.enabled = true
  config.public_file_server.headers = { "Cache-Control" => "public, max-age=31536000, immutable" }

  config.force_ssl = ENV["FORCE_SSL"] == "true"

  config.hosts << ENV["APP_HOST"] if ENV["APP_HOST"].present?
  config.hosts << /.+\.fly\.dev/
  config.hosts << /.+\.onrender\.com/
end
