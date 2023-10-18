class Flight < ApplicationRecord
  belongs_to :departure_airport, class_name: 'Airport'
  belongs_to :arrival_airport, class_name: 'Airport'
  has_many :bookings
  has_many :passengers, through: :bookings

  validates :departure_time, presence: true
  validates :flight_duration, presence: true

  def departure_date_formatted
    departure_time.strftime('%B %d, %Y')
  end

  def departure_time_formatted
    departure_time.strftime('%l:%M %P')
  end
end
