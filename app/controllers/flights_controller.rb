class FlightsController < ApplicationController
  def index
    @airports = Airport.all
    @departure_airport = Airport.where(id: query_params[:departure_airport_id])
    @arrival_airport = Airport.where(id: query_params[:arrival_airport_id])
    @departure_time = query_params[:departure_time]
    @num_of_passengers = query_params[:passengers]

    unless @departure_time.blank?
      @time = DateTime.parse(@departure_time)
      @start_time = DateTime.new(@time.year, @time.month, @time.day, 6, 0)
      @end_time = DateTime.new(@time.year, @time.month, @time.day, 11, 59)
    end

    @flights = Flight.where(
      departure_airport_id: Airport.where(id: @departure_airport),
      arrival_airport_id: Airport.where(id: @arrival_airport),
      departure_time: (@start_time..@end_time)
    ).order(:departure_time)
  end

  private

  def flight_params
    params.require(:flight).permit(:departure_airport_id, :arrival_airport_id, :date)
  end

  def query_params
    params.permit(:departure_airport_id, :arrival_airport_id, :departure_time,
                  :passengers, :flight_id, :commit, :authenticity_token)
  end
end
