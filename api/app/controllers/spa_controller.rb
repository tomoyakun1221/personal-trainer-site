class SpaController < ApplicationController
  def show
    path = Rails.public_path.join("index.html")
    return head :not_found unless path.exist?

    render file: path, layout: false, content_type: "text/html"
  end
end
