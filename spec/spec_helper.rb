require 'bundler'
Bundler.require

ENV['environment'] = 'test'

Dir.glob(File.expand_path('../../config/*.rb', __FILE__)) { |file| require file }
Dir.glob(File.expand_path('../../lib/*.rb', __FILE__)) { |file| require file }

RSpec.configure do |config|
  config.color_enabled = true
  config.tty = true
end
