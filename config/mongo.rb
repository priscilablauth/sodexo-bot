MongoMapper.connection = Mongo::Connection.new('staff.mongohq.com',10071, :pool_size => 5, :pool_timeout => 5)
MongoMapper.database = 'aceita_sodexo'
MongoMapper.database.authenticate('netto','netto123')
