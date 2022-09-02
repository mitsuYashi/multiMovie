FROM ruby:2.5.3

RUN apt-get update -qq && \
	apt-get install -y build-essential \
	libpq-dev \
	nodejs

RUN mkdir /app_name
ENV APP_ROOT /app_name
WORKDIR $APP_ROOT

# ADD ./Gemfile $APP_ROOT/Gemfile
# ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock
COPY Gemfile /app_name/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

RUN bundle install
COPY . /app_name

# CMD ["rm tmp/pids/server.pid; bin/rails assets:precompile && bin/rails s -p ${PORT} -b 0.0.0.0"]
CMD [ "bin/start" ]