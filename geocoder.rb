require 'bundler'
Bundler.require

Dir.glob(File.dirname(__FILE__) + '/config/*') {|file| require file}
Dir.glob(File.dirname(__FILE__) + '/lib/*') {|file| require file}

Address.all.each do |address|
  if address.coordinates.empty?
    address.geocode
    address.save
  end
end
