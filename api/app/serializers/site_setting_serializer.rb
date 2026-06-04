class SiteSettingSerializer
  def self.as_json(setting, host:)
    {
      id: setting.id,
      trainer_name: setting.trainer_name,
      tagline: setting.tagline,
      hero_description: setting.hero_description,
      profile_title: setting.profile_title,
      profile_body: setting.profile_body,
      qualifications: setting.qualifications,
      specialties: setting.specialties,
      line_url: setting.line_url,
      instagram_url: setting.instagram_url,
      email: setting.email,
      phone: setting.phone,
      location: setting.location,
      profile_image_url: blob_url(setting.profile_image, host),
      hero_image_url: blob_url(setting.hero_image, host)
    }
  end

  def self.blob_url(attachment, host)
    return nil unless attachment.attached?

    Rails.application.routes.url_helpers.rails_blob_url(attachment, host: host)
  end
end
