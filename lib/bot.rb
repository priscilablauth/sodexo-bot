module Sodexo
  class Bot

    def initialize
      @spider = Sodexo.new
      @parser = VenueParser.new
    end

    def run(state, city)
      results = @spider.search(state, city)
      venues = results.map do |result|
        begin
          store(result)
        rescue Exception => e
          puts "#{e} -> #{result}"
        end
      end
      @spider.go_to_search_page
    end

    private
    def store(result)
      venue = @parser.parse(result)
      venues_with_same_name = Venue.where(:name => venue.name)
      already_exists = venues_with_same_name.any? do |venue_with_same_name|
        venue_with_same_name.address.street == venue.address.street
      end
      venue.save unless already_exists
    end
  end
end

