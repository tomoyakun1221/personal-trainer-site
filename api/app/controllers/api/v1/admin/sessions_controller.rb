module Api
  module V1
    module Admin
      class SessionsController < ApplicationController
        def create
          admin = AdminUser.find_by(email: params[:email])
          if admin&.authenticate(params[:password])
            token = JsonWebToken.encode(admin_id: admin.id)
            render json: { token: token, email: admin.email }
          else
            render json: { error: "メールアドレスまたはパスワードが正しくありません" }, status: :unauthorized
          end
        end
      end
    end
  end
end
