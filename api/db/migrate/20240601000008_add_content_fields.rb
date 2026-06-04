class AddContentFields < ActiveRecord::Migration[7.1]
  def change
    change_table :pricing_plans do |t|
      t.string :course_breakdown
      t.string :bulk_offer
      t.text :promotion
      t.text :target_audience
      t.boolean :includes_drink, default: false, null: false
      t.string :plan_category, default: "ticket"
    end

    change_table :transformations do |t|
      t.decimal :before_weight, precision: 5, scale: 1
      t.decimal :after_weight, precision: 5, scale: 1
      t.string :result_summary
      t.boolean :composite_display, default: false, null: false
    end

    change_table :testimonials do |t|
      t.string :guest_type
    end
  end
end
