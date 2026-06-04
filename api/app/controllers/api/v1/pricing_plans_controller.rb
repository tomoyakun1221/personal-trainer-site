module Api
  module V1
    class PricingPlansController < ApplicationController
      include PricingPlanJson

      def index
        plans = PricingPlan.ordered
        render json: plans.map { |p| plan_json(p) }
      end

      def show
        plan = PricingPlan.find(params[:id])
        render json: plan_json(plan)
      end
    end
  end
end
