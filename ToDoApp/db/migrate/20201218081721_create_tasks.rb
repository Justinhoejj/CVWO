class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :body
      t.boolean :done
      t.date :due

      t.timestamps
    end
  end
end
