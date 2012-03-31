require 'bundler'
Bundler.require

Dir.glob(File.expand_path('../../config/*', __FILE__)) { |file| require file }
Dir.glob(File.expand_path('../../lib/*', __FILE__)) { |file| require file }

RSpec.configure do |config|
  config.color_enabled = true
  config.tty = true
end
