require 'spec_helper'

describe 'parsing venues from the website' do

  before(:all) do
    parser = Spider::VenueParser.new
    raw_venue = ["DA TERRA SUPERMERCADO", "Estado:RS", "Cidade:CACEQUI", "Bairro:CENTRO", "Endereco: R BENTO GONCALVES ,780 TERREO"]
    @venue = parser.parse(raw_venue)
  end

  it 'parses them into Venues' do
    @venue.should be_kind_of Venue
  end

  it 'camelizes the title' do
    @venue.name.should eql 'Da Terra Supermercado'
  end

  it 'parses the address correctly' do
    expected_address = Address.new state: 'RS', city: 'Cacequi', neighborhood: 'Centro', street: 'R Bento Goncalves ,780 Terreo'
    @venue.address.should == expected_address
  end
end
