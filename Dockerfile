# 本番用: フロントビルド + Rails API（同一オリジンで配信）
FROM node:20-alpine AS frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
ENV VITE_API_URL=
RUN npm run build

FROM ruby:3.2.6-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential default-libmysqlclient-dev libpq-dev git curl imagemagick && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV RAILS_ENV=production \
    BUNDLE_WITHOUT="development:test" \
    BUNDLE_DEPLOYMENT=1

COPY api/Gemfile api/Gemfile.lock ./
RUN bundle install

COPY api/ ./
COPY --from=frontend-build /frontend/dist ./public

EXPOSE 3000

COPY docker/api-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
