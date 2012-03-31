class Address
  include MongoMapper::Document
  include Geocoder::Model::MongoMapper

  key :state, String
  key :city, String
  key :neighborhood, String
  key :street, String

  key :coordinates, Array
  geocoded_by :human_readable

  belongs_to :venue

  def == (other)
    @state == other.state and @city == other.city and @neighborhood == other.neighborhood and @street == other.street
  end

  def to_s
    "#{@street} - #{@city} - #{@state}"
  end

  def human_readable
    to_s
  end
end
