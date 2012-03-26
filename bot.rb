require 'capybara'
require 'capybara/dsl'
require 'capybara-webkit'
Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

Capybara.run_server = false
Capybara.default_wait_time = 10
Capybara.current_driver = :selenium
Capybara.app_host = "http://webservices.maplink2.com.br"

spider = Spider::Sodexo.new
parser = Spider::VenueParser.new

db = {}

states = spider.states

states.each do |state|
  db[state.to_sym] = {}
  cities = spider.cities(state)

  cities.each do |city|
    results = spider.search(state, city)

    venues = results.map do |result|
      parser.parse(result)
    end

    db[state.to_sym][city.to_sym] = venues

    spider.go_to_search_page
  end
end

require 'ruby-debug'
debugger;
