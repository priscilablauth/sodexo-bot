require 'yaml'

configs = YAML::load(File.open(File.dirname(__FILE__) + "/mongo.yml"))
env = ENV['environment'] || 'default'
config = configs[env]

MongoMapper.connection = Mongo::Connection.new(config['connection'],10071, :pool_size => 5, :pool_timeout => 5)
MongoMapper.database = config['database']
MongoMapper.database.authenticate(config['user'], config['password'])
