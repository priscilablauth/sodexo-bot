require 'bundler'
require 'active_record'
Bundler.require :default, :web

Dir.glob(File.dirname(__FILE__) + '/config/*.rb') { |file| require file }
Dir.glob(File.dirname(__FILE__) + '/lib/*.rb') { |file| require file }

get '/near' do
  lat, lng = params[:latitude], params[:longitude]
  radius = params[:radius] || 10
  content_type :json
  ::Venue.near([lat, lng], radius).to_json(:include => :address, :except => [:id, :venue_id])
end

after do
  ActiveRecord::Base.clear_active_connections!
end