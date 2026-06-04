class CreateTransformations < ActiveRecord::Migration[7.1]
  def change
    create_table :transformations do |t|
      t.string :title, null: false
      t.string :client_label
      t.text :description
      t.integer :duration_weeks
      t.integer :position, default: 0
      t.boolean :published, default: true

      t.timestamps
    end
  end
end
