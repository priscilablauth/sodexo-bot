class AddAddressToVenue < ActiveRecord::Migration
  def up
    change_table :addresses do |t|
      t.integer :venue_id
    end
  end

  def down
    remove_column :addresses, :venue_id
  end
end
