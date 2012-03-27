require 'capybara'
require 'capybara/dsl'
require 'mongo_mapper'

Dir.glob(File.expand_path('../../lib/*', __FILE__)) { |file| require file }

RSpec.configure do |config|
  config.color_enabled = true
  config.tty = true
end
