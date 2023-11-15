class PassengerMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def confirmation_email
    @booking = params[:booking]
    emails = @booking.passengers.collect(&:email)
    emails.each do |email|
      mail(to: email, subject: 'Your flight has been booked')
    end
  end
end
