class Address
  include MongoMapper::EmbeddedDocument

  key :state, String
  key :city, String
  key :neighborhood, String
  key :street, String

  one :position

  belongs_to :venue

  def == (other)
    @state == other.state and @city == other.city and @neighborhood == other.neighborhood and @street == other.street
  end

  def to_s
    "#{@street} - #{@city} - #{@state}"
  end

end
