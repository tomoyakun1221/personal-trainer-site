class CreateContactInquiries < ActiveRecord::Migration[7.1]
  def change
    create_table :contact_inquiries do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone
      t.text :message, null: false
      t.string :status, null: false, default: "new"

      t.timestamps
    end
  end
end
