require 'bundler'
Bundler.require :default, :web

Dir.glob(File.dirname(__FILE__) + '/config/*.rb') {|file| require file}
Dir.glob(File.dirname(__FILE__) + '/lib/*.rb') {|file| require file}

get '/near' do
  address = params[:address]
  radius = params[:radius] || 10
  content_type :json
  ::Venue.near(address, radius).to_json(:include => :address , :except => [:id, :venue_id ])
end

