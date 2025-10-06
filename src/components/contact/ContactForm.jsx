'use client';

import React, { useState, useEffect } from 'react';

export default function ContactForm() {
  // Estado para controlar se o formulário está sendo enviado
  const [isSending, setIsSending] = useState(false);
  // Estado para controlar o resultado do envio ('success', 'error', ou null)
  const [sendResult, setSendResult] = useState(null);

  // Estado para os dados do formulário
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


  const handleSubmit = async (e) => {
    e.preventDefault();
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
        {/* Coluna do formulário */}
        <div>
          <h1 className="text-2xl md:text-3xl text-primary font-bold mb-2">
            Have a project in mind? Let’s Talk!
          </h1>
          <p className="text-primary mb-6">
            We work globally, powered by creativity and technology.
          </p>

          <form onSubmit={handleSubmit} className="text-primary space-y-6">
            <div className="grid grid-cols-1 text-primary-70 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 text-primary-70 border rounded"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full text-primary-70 p-3 border rounded"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 text-primary-70 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="w-full p-3 border rounded"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {/* --- TAG CORRIGIDA AQUI --- */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full p-3 border rounded"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* País */}
            <div>
              <select name="country" className="w-full p-3 text-primary-70 border rounded" value={formData.country} onChange={handleChange} required >
                <option value="">Select one country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Idioma */}
            <div>
              <select name="language" className="w-full p-3 text-primary-70 border rounded" value={formData.language} onChange={handleChange} required >
                <option value="">Select a Language</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

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
                    <input type="radio" name="service" value={service.value} checked={formData.service === service.value} onChange={handleChange} required />
                    <span>{service.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <textarea name="message" placeholder="Your Message..." className="w-full text-primary-70 p-3 border rounded" rows="4" value={formData.message} onChange={handleChange} required />
            
            <label className="flex items-center space-x-2 text-primary-70">
              <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required />
              <span>I accept the Terms</span>
            </label>

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
            {/* Imagem ou GIF aqui */}
        </div>
      </div>
    </div>
  );
}