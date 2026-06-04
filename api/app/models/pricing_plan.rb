class PricingPlan < ApplicationRecord
  validates :name, :price, presence: true

  scope :ordered, -> { order(:position, :id) }

  def features_list
    features.to_s.split("\n").map(&:strip).reject(&:blank?)
  end
end
