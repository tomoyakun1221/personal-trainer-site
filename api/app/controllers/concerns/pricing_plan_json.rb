module PricingPlanJson
  extend ActiveSupport::Concern

  private

  def plan_json(plan)
    {
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
      description: plan.description,
      features: plan.features_list,
      featured: plan.featured,
      position: plan.position,
      course_breakdown: plan.course_breakdown,
      bulk_offer: plan.bulk_offer,
      promotion: plan.promotion,
      target_audience: plan.target_audience,
      includes_drink: plan.includes_drink,
      plan_category: plan.plan_category
    }
  end
end
