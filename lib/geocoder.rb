module Sodexo
  class Geocoder
    def run
      Address.not_geocoded.each do |address|
        address.geocode
        address.save
      end
    end
  end
end

