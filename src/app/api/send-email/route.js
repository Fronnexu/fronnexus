import { SMTPClient } from 'emailjs';
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
  if (isEmpty(body.service)) errs.service = true;
  if (isEmpty(body.message) || body.message.trim().length < 10)
    errs.message = true;
  if (!body.terms) errs.terms = true;

  return errs;
}

export async function POST(req) {
  const formData = await req.json();

  const errs = serverValidate(formData);
  if (Object.keys(errs).length) {
    return NextResponse.json(
      { error: 'Invalid payload', fields: errs },
      { status: 400 },
    );
  }

  const client = new SMTPClient({
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    ssl: true,
  });

  try {
    await client.sendAsync({
      from: `Seu Site <${process.env.SMTP_USER}>`,
      to: 'fronnexus@gmail.com',
      subject: `Nova mensagem de: ${formData.firstName} ${formData.lastName}`,
      text: `
Nome: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Telefone: ${formData.phone}
País: ${formData.country}
Idioma: ${formData.language}
Serviço: ${formData.service}

Mensagem:
${formData.message}
      `,
    });
    return NextResponse.json(
      { message: 'E-mail enviado com sucesso!' },
      { status: 200 },
    );
  } catch (err) {
    console.error('[SMTP ERROR]', err);
    return NextResponse.json(
      { error: 'Falha ao enviar o e-mail.' },
      { status: 500 },
    );
  }
}
