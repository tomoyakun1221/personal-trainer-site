if ENV["RENDER_EXTERNAL_URL"].present?
  render_uri = URI.parse(ENV["RENDER_EXTERNAL_URL"])
  Rails.application.routes.default_url_options[:host] = render_uri.host
  Rails.application.routes.default_url_options[:protocol] = render_uri.scheme
elsif ENV["APP_HOST"].present?
  Rails.application.routes.default_url_options[:host] = ENV["APP_HOST"]
  Rails.application.routes.default_url_options[:protocol] =
    ENV.fetch("APP_PROTOCOL", Rails.env.production? ? "https" : "http")
else
  Rails.application.routes.default_url_options[:host] = "localhost:3000"
  Rails.application.routes.default_url_options[:protocol] = "http"
end
