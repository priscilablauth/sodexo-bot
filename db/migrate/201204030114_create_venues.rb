class CreateVenues < ActiveRecord::Migration
  def up
    create_table :venues do |t|
      t.string :name
    end
  end

  def down
    drop_table :venues
  end
end
