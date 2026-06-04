module Api
  module V1
    class TransformationsController < ApplicationController
      def index
        items = Transformation.published.ordered
        render json: items.map { |t| transformation_json(t) }
      end

      def show
        item = Transformation.published.find(params[:id])
        render json: transformation_json(item)
      end

      private

      def transformation_json(item)
        {
          id: item.id,
          title: item.title,
          client_label: item.client_label,
          description: item.description,
          duration_weeks: item.duration_weeks,
          before_weight: item.before_weight&.to_f,
          after_weight: item.after_weight&.to_f,
          result_summary: item.result_summary,
          composite_display: item.composite_display,
          before_image_url: blob_url(item.before_image),
          after_image_url: blob_url(item.after_image)
        }
      end
    end
  end
end
