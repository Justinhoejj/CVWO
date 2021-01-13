class Tag < ApplicationRecord
    has_many :taggings, dependent: :destroy
    has_many :tasks, through: :taggings
    belongs_to :user
end
