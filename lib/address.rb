

module Spider
  class Address
    attr_reader :state, :city, :neighborhood, :street

    def initialize(args)
      @state = args[:state]
      @city = args[:city]
      @neighborhood = args[:neighborhood]
      @street = args[:street]
    end

    def == (other)
      @state == other.state and @city == other.city and @neighborhood == other.neighborhood and @street == other.street
    end

  end
end
