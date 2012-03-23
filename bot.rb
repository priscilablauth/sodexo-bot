require 'capybara'
require 'capybara/dsl'
require 'capybara-webkit'

Capybara.run_server = false
Capybara.current_driver = :webkit
Capybara.app_host = "http://webservices.maplink2.com.br"

module Spider
  class Sodexo
    include Capybara::DSL

    def initialize
      visit('/sodexhopass/DadosBusca.aspx')
    end

    def states
      states = all("select#cboUF option").map do |state|
        state.value
      end
      states.drop(1)
    end

    def cities(state)
      select(state, :from => 'cboUF')
      wait_until do
        fetch_cities.size > 1
      end
      cities = fetch_cities.map do |city|
        city.value
      end
      cities.drop(1)
    end

    def search(city)
      select(city, :from => 'cboCidade')
      wait_until { all('select#cboBairro option').size > 1 }
      find_button('btnBuscarEstCid').click
      results = all('table#dlDadosBusca tbody tr td table').map do |result|
        result.text
      end
    end

    private
    def fetch_cities
      all('select#cboCidade option')
    end

  end
end

module Sodexo
  class Venue
    attr_reader :name, :state, :city, :neighborhood, :address

    def initialize(args)
      @name = args[:name]
      @state = args[:state]
      @city = args[:city]
      @neighborhood = args[:neighborhood]
      @address = args[:address]
    end
  end
end

spider = Spider::Sodexo.new
states = spider.states
cities = spider.cities(states[22])
agua_santa = cities[40]

results = spider.search(agua_santa)
puts results
