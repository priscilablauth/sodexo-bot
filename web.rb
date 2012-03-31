require 'bundler'
Bundler.require
require 'capybara/dsl'
require './config/mongo'

Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

get '/near' do
  address = params[:address]
  radius = params[:radius] || 10
  content_type :json
  ::Venue.near(address, radius).to_json(:include => :address , :except => :id)
end

