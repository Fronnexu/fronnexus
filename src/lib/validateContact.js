// lib/validateContact.js
export function validateContactForm(values) {
  const errors = {};

  const isEmpty = (v) => !v || String(v).trim() === '';

  if (isEmpty(values.firstName)) {
    errors.firstName = 'First name is required.';
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }

  if (isEmpty(values.lastName)) {
    errors.lastName = 'Last name is required.';
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }

  if (isEmpty(values.email)) {
    errors.email = 'E-mail is required.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'E-mail format is invalid.';
  }

  if (!isEmpty(values.phone)) {
    const phoneRegex = /^[+]?[0-9\s()-]+$/;
    if (
      !phoneRegex.test(values.phone) ||
      values.phone.replace(/\D/g, '').length < 8
    ) {
      errors.phone = 'Please enter a valid phone number (at least 8 digits).';
    }
  }

  if (isEmpty(values.country)) errors.country = 'Please select a country.';
  if (isEmpty(values.language)) errors.language = 'Please select a language.';
  if (isEmpty(values.service)) errors.service = 'Please select a service.';

  if (isEmpty(values.message) || values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  }

  if (!values.terms) errors.terms = 'You must accept the terms to continue.';

  return errors;
}
