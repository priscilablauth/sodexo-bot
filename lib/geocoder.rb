module Sodexo
  class Geocoder
    def run
      Address.all.each do |address|
        if address.coordinates.empty?
          address.geocode
          address.save
        end
      end
    end
  end
end

