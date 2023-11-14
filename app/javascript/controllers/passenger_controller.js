import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="passenger"
export default class extends Controller {
  static values = { numberOfPassengers: Number }
  static targets = [ "template", "passenger", "passengerBox", "name", "email", "nameLabel", "emailLabel" ]

  connect() {
    console.log("numberOfPassengersValue:", this.numberOfPassengersValue)
  }

  add() {
    if ("content" in document.createElement("template")) {
      this.numberOfPassengersValue++;
      const number_of_passengers = this.numberOfPassengersValue;

      console.log(number_of_passengers);

      const template = this.templateTarget;
      const all_passenger_boxes = document.querySelectorAll('[data-passenger-target="passengerBox"');
      const passenger_box = all_passenger_boxes[all_passenger_boxes.length - 1];

      const clone = template.content.cloneNode(true);
      passenger_box.appendChild(clone);

      const pname_name_attr = `booking[passengers_attributes][${number_of_passengers}][name]`;
      const pemail_name_attr = `booking[passengers_attributes][${number_of_passengers}][email]`;

      const pname_id_attr = `booking_passengers_attributes_${number_of_passengers}_name`;
      const pemail_id_attr = `booking_passengers_attributes_${number_of_passengers}_email`;

      this.nameTargets[this.nameTargets.length - 1].setAttribute("name", pname_name_attr);
      this.emailTargets[this.emailTargets.length - 1].setAttribute("name", pemail_name_attr);

      this.nameTargets[this.nameTargets.length - 1].setAttribute("id", pname_id_attr);
      this.emailTargets[this.emailTargets.length - 1].setAttribute("id", pemail_id_attr);

      this.nameLabelTargets[this.nameLabelTargets.length - 1].setAttribute("for", pname_id_attr);
      this.emailLabelTargets[this.emailLabelTargets.length - 1].setAttribute("for", pemail_id_attr);
    }
  }

  remove() {
    if (this.numberOfPassengersValue > 0) {
      this.numberOfPassengersValue--;
      let passenger_to_remove = this.passengerBoxTargets[this.passengerBoxTargets.length - 1];
      passenger_to_remove.remove();
    }
  }
}
