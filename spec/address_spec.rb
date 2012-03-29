require 'spec_helper'

describe Address do
  it "writes the full address on to_s" do
    address = Address.new state: 'RS', city: 'Cacequi', neighborhood: 'Centro', street: 'R Bento Goncalves ,780 Terreo'
    address.to_s.should eql 'R Bento Goncalves ,780 Terreo - Cacequi - RS'
  end
end
