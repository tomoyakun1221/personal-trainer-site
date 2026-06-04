module Api
  module V1
    module Admin
      class ContactInquiriesController < BaseController
        def index
          inquiries = ContactInquiry.order(created_at: :desc)
          render json: inquiries.map { |i| inquiry_json(i) }
        end

        def show
          render json: inquiry_json(ContactInquiry.find(params[:id]))
        end

        def update
          inquiry = ContactInquiry.find(params[:id])
          if inquiry.update(status: params[:status])
            render json: inquiry_json(inquiry)
          else
            render json: { errors: inquiry.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def destroy
          ContactInquiry.find(params[:id]).destroy!
          head :no_content
        end

        private

        def inquiry_json(inquiry)
          {
            id: inquiry.id,
            name: inquiry.name,
            email: inquiry.email,
            phone: inquiry.phone,
            message: inquiry.message,
            status: inquiry.status,
            created_at: inquiry.created_at
          }
        end
      end
    end
  end
end
