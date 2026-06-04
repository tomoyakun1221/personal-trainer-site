module Api
  module V1
    class ContactInquiriesController < ApplicationController
      def create
        inquiry = ContactInquiry.new(inquiry_params)
        if inquiry.save
          render json: { message: "お問い合わせを受け付けました。ありがとうございます。" }, status: :created
        else
          render json: { errors: inquiry.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def inquiry_params
        params.require(:contact_inquiry).permit(:name, :email, :phone, :message)
      end
    end
  end
end
