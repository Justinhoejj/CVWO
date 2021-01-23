class Tag < ApplicationRecord
    has_many :taggings, dependent: :destroy
    has_many :tasks, through: :taggings
    belongs_to :user
    has_many :subtasks, through: :tasks
    validates :name, presence: true
end
