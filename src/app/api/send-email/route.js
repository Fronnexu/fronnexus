import { SMTPClient } from 'emailjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.json();

  // Configura o cliente SMTP 
  const client = new SMTPClient({
    user: process.env.SMTP_USER,       // Seu e-mail de envio
    password: process.env.SMTP_PASS,   // Sua senha de e-mail (ou senha de aplicativo)
    host: process.env.SMTP_HOST,       // Ex: 'smtp.gmail.com'
    ssl: true,
  });

  try {
    await client.sendAsync({
      from: `Seu Site <${process.env.SMTP_USER}>`, 
      to: 'fronnexus@gmail.com',  
      subject: `Nova mensagem de: ${formData.firstName} ${formData.lastName}`,
      text: `
        Você recebeu uma nova mensagem de contato!

        Nome: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Telefone: ${formData.phone}
        País: ${formData.country}
        Idioma: ${formData.language}
        Serviço de Interesse: ${formData.service}

        
        Mensagem:
        ${formData.message}
      `,
    });
    return NextResponse.json({ message: 'E-mail enviado com sucesso!' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Falha ao enviar o e-mail.' }, { status: 500 });
  }
}