require 'yaml'

configs = YAML::load(File.open(File.dirname(__FILE__) + "/database.yml"))
env = ENV['environment'] || 'default'
config = configs[env]

ActiveRecord::Base.establish_connection(config.to_hash)
