class CreateClients < ActiveRecord::Migration[7.0]
  def change
    create_table :clients do |t|
      t.string :url
      t.string :unique_id
      t.string :code
      t.string :order_id
      t.string :address
      t.strings :amount
      t.string :public_key
      t.string :private_key

      t.timestamps
    end
  end
end
