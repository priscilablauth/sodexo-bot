class Venue
  include MongoMapper::Document

  key :name, String
  one :address
end
