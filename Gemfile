source "https://rubygems.org"

gem "rails", "~> 7.1.0"

# Database
gem "pg", "~> 1.5"

# Web server
gem "puma", "~> 6.4.0"

# Frontend assets
gem "sprockets-rails"
gem "importmap-rails", "~> 1.0.3"
gem "tailwindcss-rails", "~> 2.0.4"
gem "cssbundling-rails"

# API and JSON building
gem "jbuilder"
gem "rack-cors"
gem 'active_model_serializers'

# Authentication & Authorization
gem 'bcrypt', '~> 3.1.7'
gem 'jwt', '~> 2.7'
gem 'pundit', '~> 2.3'

# AI Integration
gem "ruby-openai"

# Development and testing
group :development, :test do
  gem "debug", platforms: [:mri, :mswin, :mingw, :x64_mingw], require: "debug/prelude"
  gem "pry-rails"
  gem "pry-byebug"
  gem "dotenv-rails"
end

group :development do
  gem "listen", "~> 3.7"
  gem "spring"
  gem "web-console"
  gem 'rails-erd', '~> 1.7', '>= 1.7.2', require: false
end

gem "tzinfo-data", platforms: [:mswin, :mingw, :x64_mingw, :jruby]

gem "webpacker", "6.0.0.rc.6"
gem "react-rails", "~> 3.2"
