class Ticket < ApplicationRecord
  belongs_to :user, optional: true

  validates :title, presence: true
  validates :submitted_by_name, presence: true
  validates :submitted_by_email, presence: true

  VALID_STATUSES = ['open', 'closed']

  scope :reverse_chronological, -> { order(created_at: :desc)}
end
