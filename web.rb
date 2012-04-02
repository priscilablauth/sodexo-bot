require 'bundler'
Bundler.require :default, :web

Dir.glob(File.dirname(__FILE__) + '/config/*.rb') {|file| require file}
Dir.glob(File.dirname(__FILE__) + '/lib/*.rb') {|file| require file}

get '/near' do
  lat = params[:latitude]
  lng = params[:longitude]
  radius = params[:radius] || 10
  content_type :json
  ::Venue.near(Geocoder.address([lat, lng]), radius).to_json(:include => :address , :except => [:id, :venue_id ])
end
