module Spider
  class VenueParser

    def parse(raw_venue)
      args = {}
      args[:name] = camelize raw_venue[0]
      args[:address] = parse_address(raw_venue)
      Venue.new(args)
    end

    private
    def parse_address(raw_venue)
      args = {}
      args[:state] = split raw_venue[1]
      args[:city] = split camelize raw_venue[2]
      args[:neighborhood] = split camelize raw_venue[3]



      street = split(camelize raw_venue[4])
      args[:street] = street.strip unless street.nil?

      Address.new(args)
    end

    def camelize(string)
      string.split(/([^a-z0-9])/i).map{|w| w.capitalize}.join
    end

    def split(string)
      string.split(':')[1]
    end

  end
end

