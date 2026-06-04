class CreateTestimonials < ActiveRecord::Migration[7.1]
  def change
    create_table :testimonials do |t|
      t.string :client_name, null: false
      t.string :client_age
      t.text :content, null: false
      t.integer :rating, default: 5
      t.integer :position, default: 0
      t.boolean :published, default: true

      t.timestamps
    end
  end
end
