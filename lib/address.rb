class Address < ActiveRecord::Base

  geocoded_by :full_street_address
  belongs_to :venue

  def == (other)
    @state == other.state and @city == other.city and @neighborhood == other.neighborhood and @street == other.street
  end

  def to_s
    "#{@street} - #{@city} - #{@state}"
  end

  def full_street_address
    to_s
  end
end
