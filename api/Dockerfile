FROM ruby:3.2.6-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends build-essential default-libmysqlclient-dev git curl imagemagick && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock* ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["bash", "-c", "rm -f tmp/pids/server.pid && bundle exec rails db:migrate && bundle exec rails db:seed && bundle exec rails server -b 0.0.0.0 -p 3000"]
