require 'bundler'
Bundler.require

Dir.glob(File.dirname(__FILE__) + '/config/*') {|file| require file}
Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

Geocoder::Configuration.lookup = :yahoo

puts Venue.first.address.geocoded?
