class SodexoBot

  def run(selected_state, selected_city)
    spider = Spider::Sodexo.new
    parser = Spider::VenueParser.new

    db = {}
    states = spider.states
    states = [selected_state] #only RS

    states.each do |state|
      db[state.to_sym] = {}
      cities = spider.cities(state)
      cities = [selected_city]

      cities.each do |city|
        results = spider.search(state, city)

        venues = results.map do |result|
          begin
            venue = parser.parse(result)
            venue.save
            venue
          rescue Exception => e
            puts "#{e} -> #{result}"
          end
        end

        db[state.to_sym][city.to_sym] = venues
        spider.go_to_search_page
      end
    end
  end
end
