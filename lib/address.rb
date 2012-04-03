class Address < ActiveRecord::Base
  extend Geocoder::Model::ActiveRecord

  geocoded_by :full_street_address
  belongs_to :venue

  def == (other)
    read_attribute(:state) == other.state and read_attribute(:city) == other.city and read_attribute(:neighborhood) == other.neighborhood and read_attribute(:street) == other.street
  end

  def to_s
    "#{read_attribute(:street)} - #{read_attribute(:city)} - #{read_attribute(:state)}"
  end

  def full_street_address
    to_s
  end
end
