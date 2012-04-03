class Venue < ActiveRecord::Base

  def full_address
    self.address.to_s
  end

  def self.near(readable_address, radius)
    Address.near(readable_address, radius).map  do |address|
      address.venue
    end
  end

end
