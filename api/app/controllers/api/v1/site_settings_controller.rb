module Api
  module V1
    class SiteSettingsController < ApplicationController
      def show
        setting = SiteSetting.current
        render json: SiteSettingSerializer.as_json(setting, host: request.base_url)
      end
    end
  end
end
