require 'mongo_mapper'
require 'geocoder'
require 'capybara'
require 'capybara/dsl'
require './config/mongo'

Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

Venue.all.each do |venue|
  puts "geocoding: #{venue.address.to_s}"

  result = Geocoder.search(venue.address.to_s)
  unless result.empty?
    position = Position.new :latitude => result[0].latitude, :longitude => result[0].longitude
    venue.address.position = position
    venue.address.save
    venue.save
  end
end
