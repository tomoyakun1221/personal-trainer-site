class Transformation < ApplicationRecord
  has_one_attached :before_image
  has_one_attached :after_image

  validates :title, presence: true

  scope :published, -> { where(published: true) }
  scope :ordered, -> { order(:position, :id) }
end
