require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.secret_key_base = ENV.fetch(
    "SECRET_KEY_BASE",
    "development_secret_key_base_for_personal_trainer_api_only_do_not_use_in_production_7f3a9c2e1b8d4f6a0e5c7d9b2f4a6e8c0d2f4b6a8e0c2d4f6a8e0c2d4f6a8e0c2d4"
  )
  config.enable_reloading = true
  config.eager_load = false
  config.consider_all_requests_local = true
  config.server_timing = true
  config.active_storage.service = :local
  config.action_mailer.raise_delivery_errors = false
  config.active_support.deprecation = :log
  config.active_record.migration_error = :page_load
  config.active_record.verbose_query_logs = true
end
