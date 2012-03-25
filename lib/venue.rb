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
