require 'capybara'
require 'capybara/dsl'

Dir.glob(File.expand_path('../../lib/*', __FILE__)) { |file| require file }
