require 'capybara'
require 'capybara/dsl'
require 'capybara-webkit'
require 'mongo_mapper'
require 'geocoder'

require './config/mongo'

Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

Capybara.run_server = false
Capybara.default_wait_time = 10
Capybara.current_driver = :selenium
Capybara.app_host = "http://webservices.maplink2.com.br"

spider = Spider::Sodexo.new
parser = Spider::VenueParser.new

db = {}
states = spider.states
states = ['RS'] #only RS

states.each do |state|
  db[state.to_sym] = {}
  cities = spider.cities(state)
  cities = ['PORTO ALEGRE']

  cities.each do |city|
    results = spider.search(state, city)

    venues = results.map do |result|
      venue = parser.parse(result)
      venue.save
      venue
    end

    db[state.to_sym][city.to_sym] = venues
    spider.go_to_search_page
  end
end
