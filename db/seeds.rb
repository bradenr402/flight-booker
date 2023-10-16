# Airport seeds

airport_list = [
  { code: 'SFO', city: 'San Francisco, CA' },
  { code: 'NYC', city: 'New York City, NY' },
  { code: 'ATL', city: 'Atlanta, GA' },
  { code: 'ORD', city: 'Chicago, IL' },
  { code: 'LAX', city: 'Los Angeles, CA' },
  { code: 'LAS', city: 'Las Vegas, NV' },
  { code: 'DFW', city: 'Dallas, TX' },
  { code: 'MCO', city: 'Orlando, FL' },
  { code: 'MIA', city: 'Miami, FL' },
  { code: 'DEN', city: 'Denver, CO' }
]

airport_list.each do |airport|
  Airport.create(code: airport[:code], city: airport[:city])
end

# Flight seeds

dates = (Date.today..(Date.today + 1.week)).to_a
airports = Airport.all

airports.each do |depart|
  airports.each do |arrive|
    next if depart == arrive

    random_duration = rand(90..300)
    dates.each do |d|
      rand(1..3).times do
        Flight.create(
          departure_time: DateTime.new(d.year, d.month, d.day, rand(6..23), rand(0.59)),
          flight_duration: random_duration,
          departure_airport_id: depart.id,
          arrival_airport_id: arrive.id
        )
      end
    end
  end
end
