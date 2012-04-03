class CreateAddress < ActiveRecord::Migration
  def up
    create_table :addresses do |t|
      t.string :street
      t.string :neighborhood
      t.string :city
      t.string :state
    end
  end

  def down
    drop_table :addresses
  end
end
