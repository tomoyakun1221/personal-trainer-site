class CreatePricingPlans < ActiveRecord::Migration[7.1]
  def change
    create_table :pricing_plans do |t|
      t.string :name, null: false
      t.integer :price, null: false
      t.string :period, null: false, default: "月"
      t.text :description
      t.text :features
      t.boolean :featured, default: false
      t.integer :position, default: 0

      t.timestamps
    end
  end
end
