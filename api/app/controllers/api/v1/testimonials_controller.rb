module Api
  module V1
    class TestimonialsController < ApplicationController
      def index
        items = Testimonial.published.ordered
        render json: items.map { |t| testimonial_json(t) }
      end

      def show
        item = Testimonial.published.find(params[:id])
        render json: testimonial_json(item)
      end

      private

      def testimonial_json(item)
        {
          id: item.id,
          client_name: item.client_name,
          client_age: item.client_age,
          content: item.content,
          rating: item.rating,
          guest_type: item.guest_type
        }
      end
    end
  end
end
