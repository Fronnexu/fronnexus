'use client';

import React, { useState, useEffect } from 'react';

export default function ContactForm() {

  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    language: '',
    service: '',
    message: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [countries, setCountries] = useState([]);
  const languages = ["English", "Spanish", "Portuguese"];

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.data
          .map((country) => ({
            name: country.country,
            code: country.iso2,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
      })
      .catch((err) => console.error('Erro ao buscar países:', err));
  }, []);

  // Função para atualizar o estado do formulário a cada mudança nos inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required.';
    if (!formData.lastName) newErrors.lastName = 'Last name is required.';
    if (!formData.email) {
      newErrors.email = 'E-mail is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail format is invalid.';
    }
    if (formData.phone) {
      const phoneRegex = /^[+]?[0-9\s()-]+$/;
      if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 8) {
        newErrors.phone = 'Please enter a valid phone number (at least 8 digits).';
      }
    }
    if (!formData.country) newErrors.country = 'Please select a country.';
    if (!formData.language) newErrors.language = 'Please select a language.';
    if (!formData.service) newErrors.service = 'Please select a service.';
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms to continue.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; 
    }
    setIsSending(true);
    setSendResult(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSendResult('success'); // Define o resultado como sucesso
        // Limpa o formulário
        setFormData({
          firstName: '', lastName: '', email: '', phone: '',
          country: '', language: '', service: '', message: '', terms: false,
        });
      } else {
        throw new Error('Falha na resposta do servidor');
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setSendResult('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-2xl md:text-3xl text-primary font-bold mb-2">
            Have a project in mind? Let’s Talk!
          </h1>
          <p className="text-primary mb-6">
            We work globally, powered by creativity and technology.
          </p>

          <form onSubmit={handleSubmit} className="text-primary space-y-6">
            <div className="grid grid-cols-1 text-primary-70 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className={`w-full p-3 text-primary-70 border rounded ${errors.firstName ? 'border-red-500' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className={`w-full text-primary-70 p-3 border rounded ${errors.lastName ? 'border-red-500' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>


            <div className="grid grid-cols-1 text-primary-70 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className={`w-full p-3 border rounded ${errors.email ? 'border-red-500' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className={`w-full p-3 border rounded ${errors.phone ? 'border-red-500' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <select
                name="country"
                className={`w-full p-3 text-primary-70 border rounded ${errors.country ? 'border-red-500' : ''}`}
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select one country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
            <div>
              <select
                name="language"
                className={`w-full p-3 text-primary-70 border rounded ${errors.language ? 'border-red-500' : ''}`}
                value={formData.language}
                onChange={handleChange}
              >
                <option value="">Select a Language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
            </div>

            {/* Serviços */}
            <fieldset className="space-y-2">
              <legend className="text-primary-70 mb-2">Service you’re interested in</legend>
              <div className="grid grid-cols-1 text-primary sm:grid-cols-2 gap-2">
                {[
                  { value: 'frontend', label: 'Front-End Development' },
                  { value: 'data', label: 'Data Analysis' },
                  { value: 'webdesign', label: 'Web Design' },
                  { value: 'qa', label: 'QA' },
                  { value: 'other', label: 'Other' },
                ].map((service) => (
                  <label key={service.value} className="flex items-center space-x-2 text-primary-70">
                    <input type="radio" name="service" value={service.value} checked={formData.service === service.value} onChange={handleChange} />
                    <span>{service.label}</span>
                  </label>
                ))}
              </div>
              {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
            </fieldset>

            <div>
              <textarea
                name="message"
                placeholder="Your Message..."
                className={`w-full text-primary-70 p-3 border rounded ${errors.message ? 'border-red-500' : ''}`}
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-primary-70">
                <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} />
                <span>I accept the Terms</span>
              </label>
              {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
            </div>

            {sendResult === 'success' && (
              <div className="p-3 text-green-800 bg-green-100 border border-green-400 rounded">
                Message sent successfully! Thank you for your contact.
              </div>
            )}
            {sendResult === 'error' && (
              <div className="p-3 text-red-800 bg-red-100 border border-red-400 rounded">
                An error occurred while sending the message. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full p-3 bg-background shadow-2xl text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        <div className="hidden md:flex justify-center md:justify-end">
        </div>
      </div>
    </div>
  );
}