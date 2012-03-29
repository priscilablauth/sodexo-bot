class Venue
  include MongoMapper::Document
  include Geocoder::Model::MongoMapper

  key :name, String
  one :address

  geocoded_by :full_address

  def full_address
    @address.to_s
  end
end
