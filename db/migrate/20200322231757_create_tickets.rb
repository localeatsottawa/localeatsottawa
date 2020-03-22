class CreateTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :tickets do |t|
      t.string :title
      t.text :body
      t.string :status
      t.integer :user_id
      t.string :submitted_by_name
      t.string :submitted_by_email

      t.timestamps
    end
  end
end
