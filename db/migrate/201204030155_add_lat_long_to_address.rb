class AddLatLongToAddress < ActiveRecord::Migration
  def up
    change_table :addresses do |t|
      t.float :latitude
      t.float :longitude
    end
  end

  def down
    remove_column :addresses, :latitude
    remove_column :addresses, :longitude
  end
end
