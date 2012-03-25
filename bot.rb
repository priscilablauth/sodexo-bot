require 'capybara'
require 'capybara/dsl'
require 'capybara-webkit'
Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

Capybara.run_server = false
Capybara.current_driver = :webkit
Capybara.app_host = "http://webservices.maplink2.com.br"

spider = Spider::Sodexo.new
states = spider.states
cities = spider.cities(states[22])
agua_santa = cities[40]

results = spider.search(agua_santa)
puts results
