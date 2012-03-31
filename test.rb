require 'mongo_mapper'
require 'geocoder'
require 'capybara'
require 'capybara/dsl'
require './config/mongo'

Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

require 'ruby-debug'
debugger

Geocoder::Configuration.lookup = :yahoo

puts Venue.first.address.geocoded?

puts venue
