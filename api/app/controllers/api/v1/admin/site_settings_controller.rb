module Api
  module V1
    module Admin
      class SiteSettingsController < BaseController
        def show
          setting = SiteSetting.current
          render json: SiteSettingSerializer.as_json(setting, host: request.base_url)
        end

        def update
          setting = SiteSetting.current
          setting.assign_attributes(setting_params)
          attach_images(setting)
          if setting.save
            render json: SiteSettingSerializer.as_json(setting, host: request.base_url)
          else
            render json: { errors: setting.errors.full_messages }, status: :unprocessable_entity
          end
        end

        private

        def setting_params
          params.require(:site_setting).permit(
            :trainer_name, :tagline, :hero_description, :profile_title, :profile_body,
            :qualifications, :specialties, :line_url, :instagram_url, :email, :phone, :location
          )
        end

        def attach_images(setting)
          setting.profile_image.attach(params[:profile_image]) if params[:profile_image].present?
          setting.hero_image.attach(params[:hero_image]) if params[:hero_image].present?
        end
      end
    end
  end
end
