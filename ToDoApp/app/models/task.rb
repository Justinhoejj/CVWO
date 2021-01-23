class Task < ApplicationRecord
    has_many :subtasks, dependent: :destroy
    has_many :taggings, dependent: :destroy
    has_many :tags, through: :taggings
    belongs_to :user
    validates :title, :due, presence:true
end
