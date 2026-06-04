class CreateSiteSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :site_settings do |t|
      t.string :trainer_name, null: false, default: "トレーナー名"
      t.string :tagline, null: false, default: "理想の身体へ、あなた専属のサポート"
      t.text :hero_description
      t.text :profile_title
      t.text :profile_body
      t.text :qualifications
      t.text :specialties
      t.string :line_url
      t.string :instagram_url
      t.string :email
      t.string :phone
      t.string :location

      t.timestamps
    end
  end
end
