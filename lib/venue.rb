module Spider
  class Venue
    attr_reader :name, :address

    def initialize(args)
      @name = args[:name]
      @address = args[:address]
    end
  end
end
