module Api
  module V1
    module Admin
      class PricingPlansController < BaseController
        include PricingPlanJson
        def index
          render json: PricingPlan.ordered.map { |p| plan_json(p) }
        end

        def show
          render json: plan_json(PricingPlan.find(params[:id]))
        end

        def create
          plan = PricingPlan.new(plan_params)
          if plan.save
            render json: plan_json(plan), status: :created
          else
            render json: { errors: plan.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          plan = PricingPlan.find(params[:id])
          if plan.update(plan_params)
            render json: plan_json(plan)
          else
            render json: { errors: plan.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          PricingPlan.find(params[:id]).destroy!
          head :no_content
        end

        private

        def plan_params
          params.require(:pricing_plan).permit(
            :name, :price, :period, :description, :features, :featured, :position,
            :course_breakdown, :bulk_offer, :promotion, :target_audience, :includes_drink, :plan_category
          )
        end
      end
    end
  end
end
