import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Fronnexus — Digital Agency',
  description:
    'Fronnexus crafts seamless digital experiences with precision and creativity. Front-end development, web design, data analysis, and QA.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="antialiased bg-background text-primary">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
