class Address
  include MongoMapper::EmbeddedDocument

  key :state, String
  key :city, String
  key :neighborhood, String
  key :street, String

  belongs_to :venue

  def == (other)
    @state == other.state and @city == other.city and @neighborhood == other.neighborhood and @street == other.street
  end

end
