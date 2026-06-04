module Api
  module V1
    module Admin
      class TransformationsController < BaseController
        def index
          render json: Transformation.ordered.map { |t| transformation_json(t) }
        end

        def show
          render json: transformation_json(Transformation.find(params[:id]))
        end

        def create
          item = Transformation.new(transformation_params)
          attach_images(item)
          if item.save
            render json: transformation_json(item), status: :created
          else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          item = Transformation.find(params[:id])
          item.assign_attributes(transformation_params)
          attach_images(item)
          if item.save
            render json: transformation_json(item)
          else
            render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          Transformation.find(params[:id]).destroy!
          head :no_content
        end

        private

        def transformation_params
          params.require(:transformation).permit(
            :title, :client_label, :description, :duration_weeks, :position, :published,
            :before_weight, :after_weight, :result_summary, :composite_display
          )
        end

        def attach_images(item)
          item.before_image.attach(params[:before_image]) if params[:before_image].present?
          item.after_image.attach(params[:after_image]) if params[:after_image].present?
        end

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
            position: item.position,
            published: item.published,
            before_image_url: blob_url(item.before_image),
            after_image_url: blob_url(item.after_image)
          }
        end
      end
    end
  end
end
