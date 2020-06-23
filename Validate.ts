/**
 * @class Validate
 * @description TypeScript class for validating input values.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 * @constructor
 */

export default class Validate {

  input: any = {};
  details: any = {};
  errors: any = [];
  value: string = "";

  constructor(input: any, value: string) {

    this.input = input;
    this.value = value;

    // Validate required input fields.
    if(!this.value.length || this.value === "") {

      if(this.input.$el.classList.contains('field-select')) {
        this.errors.push(`Please select your ${this.input.label.toLowerCase()}.`);
      }else if(this.input.required) {
        this.errors.push(`Please enter your ${this.input.label.toLowerCase()}.`);
      }

    }else{

      if(this.input.min && this.value.length < this.input.min) {
        this.errors.push(`Must be more than ${this.input.min} characters.`);
      }

      if(this.input.max && this.value.length > this.input.max) {
        this.errors.push(`Must be less than ${this.input.max} characters.`);
      }

    }

    // Validate email address input fields.
    if(['email'].includes(this.input.type) || ['email', 'emailAddress'].includes(this.input.name)) {
      this.EmailAddress();
    }

    if(['url', 'website'].includes(this.input.type) || ['url', 'website'].includes(this.input.name)) {
      this.WebAddress();
    }

    // Validate phone number input fields.
    if(['phone', 'tel'].includes(this.input.type) || ['phone', 'phoneNumber'].includes(this.input.name)) {
      this.PhoneNumber();
    }

    // Validate postal code input fields.
    if(['postal', 'postalCode', 'zip', 'zipCode'].includes(this.input.name)) {
      this.PostalCode();
    }

    // Validate credit card input fields.
    if(['creditcard', 'card', 'cc'].includes(this.input.type)) {
      this.CreditCard();
    }

  }

  /**
   * @method Validate.CreditCard
   * @description Validates credit card numbers.
   * @reference https://www.regular-expressions.info/creditcard.html
   */

  CreditCard() {

    // Only allow digits.
    let disallowedChars = /[^\d]/gm;

    // All Visa card numbers start with a 4.
    // New cards have 16 digits. Old cards have 13.
    let visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/gm;

    // MasterCard numbers either start with the numbers 51 through 55
    // or with the numbers 2221 through 2720. All have 16 digits.
    let masterCardPattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/gm;

    // American Express card numbers start with 34 or 37 and have 15 digits.
    let americanExpressPattern = /^3[47][0-9]{13}$/gm;

    // Discover card numbers begin with 6011 or 65. All have 16 digits.
    let discoverPattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/gm;

    // Remove unwanted characters from the phone number string.
    this.value = this.value.replace(disallowedChars, "").normalize("NFC");

    if(this.value.length) {
      if (visaPattern.test(this.value)) {
        this.details.cardType = 'visa';
      } else if (masterCardPattern.test(this.value)) {
        this.details.cardType = 'mastercard';
      } else if (americanExpressPattern.test(this.value)) {
        this.details.cardType = 'amex';
      } else if (discoverPattern.test(this.value)) {
        this.details.cardType = 'discover';
      } else {
        delete this.details.cardType;
        this.errors.push(`The ${this.input.label.toLowerCase()} entered is invalid.`);
      }
    }

  }


  /**
   * @method Validate.PostalCode
   * @description Validates postal code strings.
   */

  PostalCode() {

    let postalPattern = new RegExp(this.input.pattern || /[0-9]+/gm);

    // Test the ZIP code pattern.
    if(this.value.length && !postalPattern.test(this.value)) {
      this.errors.push(`The ${this.input.label.toLowerCase()} entered is invalid.`);
    }

  }


  /**
   * @method Validate.EmailAddress
   * @description Validates email address strings.
   */

  EmailAddress() {

    let emailPattern = new RegExp(this.input.pattern || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gm);

    // Test the email address pattern.
    if(this.value.length && !emailPattern.test(this.value)) {
      this.errors.push(`The ${this.input.label.toLowerCase()} entered is invalid.`);
    }

  }


  /**
   * @method Validate.WebAddress
   * @description Validates website address strings.
   */

  WebAddress() {

    let urlPattern = new RegExp(this.input.pattern || /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm);

    // Test the email address pattern.
    if(this.value.length && !urlPattern.test(this.value)) {
      this.errors.push(`The ${this.input.label.toLowerCase()} entered is invalid.`);
    }

  }


  /**
   * @method Validate.PhoneNumber
   * @description Validates phone number strings.
   */

  PhoneNumber() {

    let disallowedChars = /[^\s\d-+.()]/gm;
    let phonePattern = new RegExp(this.input.pattern || /^(\+?\d{1,2}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm);

    // Remove unwanted characters from the phone number string.
    this.value = this.value.replace(disallowedChars, "").normalize("NFC");

    // Test the phone number pattern.
    if(this.value.length && !phonePattern.test(this.value)) {
      this.errors.push(`The ${this.input.label.toLowerCase()} entered is invalid.`);
    }

  }


}
