module Api
  module V1
    module Admin
      class TestimonialsController < BaseController
        def index
          render json: Testimonial.ordered.map { |t| testimonial_json(t) }
        end

        def show
          render json: testimonial_json(Testimonial.find(params[:id]))
        end

        def create
          item = Testimonial.new(testimonial_params)
          if item.save
            render json: testimonial_json(item), status: :created
          else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          item = Testimonial.find(params[:id])
          if item.update(testimonial_params)
            render json: testimonial_json(item)
          else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          Testimonial.find(params[:id]).destroy!
          head :no_content
        end

        private

        def testimonial_params
          params.require(:testimonial).permit(
            :client_name, :client_age, :content, :rating, :position, :published, :guest_type
          )
        end

        def testimonial_json(item)
          {
            id: item.id,
            client_name: item.client_name,
            client_age: item.client_age,
            content: item.content,
            rating: item.rating,
            guest_type: item.guest_type,
            position: item.position,
            published: item.published
          }
        end
      end
    end
  end
end
