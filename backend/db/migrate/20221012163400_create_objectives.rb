class CreateObjectives < ActiveRecord::Migration[7.0]
  def change
    create_table :objectives do |t|
      t.text :name
      t.text :type
      t.text :description

      t.timestamps
    end
  end
end
