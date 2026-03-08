import { NextResponse } from 'next/server';

function serverValidate(body) {
  const errs = {};
  const isEmpty = (v) => !v || String(v).trim() === '';

  if (isEmpty(body.firstName)) errs.firstName = true;
  if (isEmpty(body.lastName)) errs.lastName = true;
  if (isEmpty(body.email) || !/\S+@\S+\.\S+/.test(body.email))
    errs.email = true;
  if (!isEmpty(body.phone)) {
    const phoneRegex = /^[+]?[0-9\s()-]+$/;
    if (
      !phoneRegex.test(body.phone) ||
      body.phone.replace(/\D/g, '').length < 8
    )
      errs.phone = true;
  }
  if (isEmpty(body.country)) errs.country = true;
  if (isEmpty(body.language)) errs.language = true;
  if (!Array.isArray(body.service) || body.service.length === 0)
    errs.service = true;
  if (isEmpty(body.message) || body.message.trim().length < 10)
    errs.message = true;
  if (!body.terms) errs.terms = true;

  return errs;
}

const RECIPIENT = 'erickyhenriquesd@gmail.com';

export async function POST(req) {
  const formData = await req.json();

  const errs = serverValidate(formData);
  if (Object.keys(errs).length) {
    return NextResponse.json(
      { error: 'Invalid payload', fields: errs },
      { status: 400 },
    );
  }

  const services = Array.isArray(formData.service)
    ? formData.service.join(', ')
    : formData.service;

  const apiKey = process.env.RESEND_API_KEY;

  // If Resend API key is configured, send via Resend
  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Fronnexus Contact <onboarding@resend.dev>',
          to: [RECIPIENT],
          subject: `New inquiry from ${formData.firstName} ${formData.lastName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 24px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
                <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Fronnexus Website</p>
              </div>
              <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${formData.firstName} ${formData.lastName}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #8b5cf6;">${formData.email}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td><td style="padding: 8px 0;">${formData.phone || 'Not provided'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Country</td><td style="padding: 8px 0;">${formData.country}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Language</td><td style="padding: 8px 0;">${formData.language}</td></tr>
                  <tr><td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Services</td><td style="padding: 8px 0;">${services}</td></tr>
                </table>
                <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e7eb;" />
                <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px;">Message</p>
                <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; white-space: pre-line; font-size: 14px; line-height: 1.6;">
${formData.message}
                </div>
              </div>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('[RESEND ERROR]', err);
        return NextResponse.json(
          { error: 'Failed to send email.' },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: 'Email sent successfully!' },
        { status: 200 },
      );
    } catch (err) {
      console.error('[RESEND ERROR]', err);
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 },
      );
    }
  }

  // Fallback: save to Supabase if no email service configured
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const { error } = await supabase.from('contact_submissions').insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone || null,
      country: formData.country,
      language: formData.language,
      services: services,
      message: formData.message,
    });

    if (error) {
      console.error('[SUPABASE INSERT ERROR]', error);
      return NextResponse.json(
        { error: 'Failed to save submission.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'Submission saved successfully!' },
      { status: 200 },
    );
  } catch (err) {
    console.error('[FALLBACK ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to process submission.' },
      { status: 500 },
    );
  }
}
