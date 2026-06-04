module AdminAuthenticatable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_admin!
  end

  private

  def authenticate_admin!
    header = request.headers["Authorization"]
    token = header&.split&.last
    decoded = JsonWebToken.decode(token)
    @current_admin = AdminUser.find_by(id: decoded[:admin_id]) if decoded
    render json: { error: "認証が必要です" }, status: :unauthorized unless @current_admin
  end

  def current_admin
    @current_admin
  end
end
