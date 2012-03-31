class SodexoBot

  def initialize
    @spider = Spider::Sodexo.new
    @parser = Spider::VenueParser.new
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
    venue.save
    venue
  end
end
