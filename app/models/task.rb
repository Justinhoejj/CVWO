class Task < ApplicationRecord
    has_many :subtasks
    has_many :taggings
    has_many :tags, through: :taggings
end
