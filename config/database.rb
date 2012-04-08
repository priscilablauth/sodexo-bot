require 'yaml'

configs = YAML::load(File.open(File.dirname(__FILE__) + "/database.yml"))
env = ENV['environment'] || 'default'
db_config = configs[env]

ActiveRecord::Base.establish_connection(db_config.to_hash)
