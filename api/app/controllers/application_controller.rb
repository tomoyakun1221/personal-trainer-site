class ApplicationController < ActionController::API
  include ActiveStorage::SetCurrent

  private

  def blob_url(attachment)
    return nil unless attachment.attached?

    Rails.application.routes.url_helpers.rails_blob_url(attachment, host: request.base_url)
  end
end
