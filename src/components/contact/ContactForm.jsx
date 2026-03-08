'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { validateContactForm } from '../../lib/validateContact';
import ScrollReveal from '../utils/ScrollReveal';

const inputBase =
  'w-full px-4 py-3 rounded-xl border border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary text-sm placeholder:text-primary-70 focus:outline-none focus:ring-2 focus:ring-[rgba(139,92,246,0.3)] focus:border-[rgba(139,92,246,0.3)] transition-all';

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
    service: [],
    message: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const languages = ['English', 'Spanish', 'Portuguese'];

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
      .catch((err) => console.error('Error fetching countries:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'service') {
      const updatedServices = checked
        ? [...formData.service, value]
        : formData.service.filter((s) => s !== value);

      const next = { ...formData, service: updatedServices };
      setFormData(next);
      const fieldErrors = validateContactForm(next);
      setErrors((prev) => ({ ...prev, service: fieldErrors.service }));
    } else {
      const next = {
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      };
      setFormData(next);
      const fieldErrors = validateContactForm(next);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSending(true);
    setSendResult(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSendResult('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          country: '',
          language: '',
          service: [],
          message: '',
          terms: false,
        });
        setErrors({});
      } else {
        setSendResult('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSendResult('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-20 flex flex-col items-center bg-background">
      <div className="w-full max-w-2xl">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[rgba(139,92,246,0.2)] bg-[rgba(139,92,246,0.08)] text-[#a78bfa] mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Let&apos;s Build Something Great Together
            </h1>
            <p className="mt-3 text-primary-70 text-base max-w-lg mx-auto leading-relaxed">
              Whether you need a brand-new website, a redesign, or a custom digital solution,
              our team is ready to bring your vision to life. Tell us about your project
              and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 md:p-8 space-y-5"
          >
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-primary-70 mb-1.5">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="e.g. John"
                  className={`${inputBase} ${errors.firstName ? 'border-red-400' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-primary-70 mb-1.5">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="e.g. Doe"
                  className={`${inputBase} ${errors.lastName ? 'border-red-400' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-primary-70 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className={`${inputBase} ${errors.email ? 'border-red-400' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-primary-70 mb-1.5">Phone <span className="text-primary-70/60">(optional)</span></label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  className={`${inputBase} ${errors.phone ? 'border-red-400' : ''}`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Country & Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-primary-70 mb-1.5">Country</label>
                <select
                  name="country"
                  className={`${inputBase} ${errors.country ? 'border-red-400' : ''}`}
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="">Where are you based?</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-400 text-xs mt-1">{errors.country}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-primary-70 mb-1.5">Preferred Language</label>
                <select
                  name="language"
                  className={`${inputBase} ${errors.language ? 'border-red-400' : ''}`}
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="">How should we communicate?</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {errors.language && (
                  <p className="text-red-400 text-xs mt-1">{errors.language}</p>
                )}
              </div>
            </div>

            {/* Services */}
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-primary mb-1">
                What can we help you with?
              </legend>
              <p className="text-xs text-primary-70 mb-2">Select all services that apply to your project.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { value: 'frontend', label: 'Front-End Development', desc: 'React, Next.js, responsive UI' },
                  { value: 'data', label: 'Data Analysis', desc: 'Dashboards, insights, reports' },
                  { value: 'webdesign', label: 'Web Design', desc: 'UI/UX, branding, prototypes' },
                  { value: 'qa', label: 'Quality Assurance', desc: 'Testing, audits, optimization' },
                  { value: 'fullstack', label: 'Full-Stack Solution', desc: 'End-to-end development' },
                  { value: 'other', label: 'Other', desc: 'Tell us in your message' },
                ].map((service) => (
                  <label
                    key={service.value}
                    className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl border text-sm cursor-pointer transition-all ${
                      formData.service.includes(service.value)
                        ? 'border-[rgba(139,92,246,0.4)] bg-[rgba(139,92,246,0.08)] text-primary'
                        : 'border-[var(--stroke-container-divider)] bg-[var(--surface-subtle)] text-primary-70 hover:border-[rgba(139,92,246,0.2)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="service"
                      value={service.value}
                      checked={formData.service.includes(service.value)}
                      onChange={handleChange}
                      className="accent-[#8b5cf6] mt-0.5"
                    />
                    <div>
                      <span className="font-medium">{service.label}</span>
                      <span className="block text-xs text-primary-70 mt-0.5">{service.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.service && (
                <p className="text-red-400 text-xs mt-1">{errors.service}</p>
              )}
            </fieldset>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-primary-70 mb-1.5">Project Details</label>
              <textarea
                name="message"
                placeholder="Describe your project, goals, timeline, and any specific requirements. The more detail you provide, the better we can tailor our response to your needs."
                className={`${inputBase} resize-none ${errors.message ? 'border-red-400' : ''}`}
                rows="5"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 text-sm text-primary-70 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="accent-[#8b5cf6] mt-0.5"
                />
                <span>
                  I agree to the{' '}
                  <Link
                    href="/terms/responsability"
                    target="_blank"
                    className="text-[#8b5cf6] hover:underline"
                  >
                    Terms of Service &amp; Privacy Policy
                  </Link>{' '}
                  and consent to Fronnexus processing my data to respond to this inquiry.
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-400 text-xs mt-1">{errors.terms}</p>
              )}
            </div>

            {/* Status messages */}
            {sendResult === 'success' && (
              <div className="p-4 text-green-700 dark:text-green-300 bg-green-500/10 border border-green-500/20 rounded-xl text-sm">
                <p className="font-medium">Message sent successfully!</p>
                <p className="mt-1 text-xs opacity-80">Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.</p>
              </div>
            )}
            {sendResult === 'error' && (
              <div className="p-4 text-red-700 dark:text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl text-sm">
                <p className="font-medium">Something went wrong.</p>
                <p className="mt-1 text-xs opacity-80">Please try again or contact us directly at erickyhenriquesd@gmail.com</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="btn-shine w-full rounded-xl bg-[#8b5cf6] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(139,92,246,0.25)] transition-all duration-300 hover:bg-[#7c3aed] hover:shadow-[rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>

            <p className="text-center text-xs text-primary-70 mt-2">
              We typically respond within 1 business day. Your information is kept confidential.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}
