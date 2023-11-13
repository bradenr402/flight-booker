import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="passenger"
export default class extends Controller {
  static values = { "number": Number }
  static targets = [ "numberPassengersElement", "label", "name", "email", "passengerBox" ]

  add() {
    if ("content" in document.createElement("template")) {
      const number_of_passengers = ++this.numberPassengersElementTarget.value

      console.log(number_of_passengers)

      const template = document.querySelector("#new_passenger")
      const passenger_fields = document.querySelector("#passenger_fields")

      const clone = template.content.cloneNode(true)
      passenger_fields.appendChild(clone)

      const pname_name_attr = `booking[passengers_attributes][${number_of_passengers - 1}][name]`;
      const pemail_name_attr = `booking[passengers_attributes][${number_of_passengers - 1}][email]`;

      const pname_id_attr = `booking_passengers_attributes_${number_of_passengers - 1}_name`;
      const pemail_id_attr = `booking_passengers_attributes_${number_of_passengers - 1}_email`;

      this.nameTargets.slice(-1)[0].setAttribute("name", pname_name_attr)
      this.emailTargets.slice(-1)[0].setAttribute("name", pemail_name_attr)

      this.nameTargets.slice(-1)[0].setAttribute("id", pname_id_attr)
      this.emailTargets.slice(-1)[0].setAttribute("id", pemail_id_attr)

      let i = 1;
      this.labelTargets.slice(-2).map((label) => {
        if (i == 1) {
          label.setAttribute("for", pname_id_attr)
        } else {
          label.setAttribute("for", pemail_id_attr)
        }
        i++;
      });
    }
  }

  remove() {
    if (this.numberPassengersElementTarget.value > 0) {
      this.numberPassengersElementTarget.value--;

      this.passengerBoxTargets.slice(-1)[0].remove()
    }
  }
}
