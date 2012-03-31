class Venue
  include MongoMapper::Document

  key :name, String
  one :address

  def full_address
    self.address.to_s
  end
end
