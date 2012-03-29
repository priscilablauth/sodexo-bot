class Position
  include MongoMapper::EmbeddedDocument

  key :latitude, Float
  key :longitude, Float
end
