class Testimonial < ApplicationRecord
  validates :client_name, :content, presence: true
  validates :rating, inclusion: { in: 1..5 }

  scope :published, -> { where(published: true) }
  scope :ordered, -> { order(:position, :id) }
end
