class SiteSetting < ApplicationRecord
  has_one_attached :profile_image
  has_one_attached :hero_image

  validates :trainer_name, presence: true

  def self.current
    first || create!(trainer_name: "トレーナー名")
  end
end
