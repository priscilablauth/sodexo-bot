require 'mongo_mapper'
require 'geocoder'
require 'capybara'
require 'capybara/dsl'
require './config/mongo'

Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

Address.all.each do |address|
  address.geocode
  address.save
end
