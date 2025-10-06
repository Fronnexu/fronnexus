// app/terms/responsability/page.jsx
'use client';

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-primary-70">
      {/* Title */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Terms of Responsibility and Data Protection
        </h1>
        <p className="text-sm text-primary-70">
          Last updated: {new Date().toLocaleDateString('en-US')}
        </p>
      </header>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          1. Introduction
        </h2>
        <p className="leading-relaxed">
          Fronnexus is committed to maintaining transparency and responsibility
          in all its development projects and partnerships. This document
          defines the principles of responsibility, ethical use, and protection
          of data applied to all services and digital products developed by our
          team.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          2. Developer Responsibility
        </h2>
        <p className="leading-relaxed">
          The Fronnexus team ensures that each project is developed according to
          industry best practices in performance, accessibility, and security.
          All code and resources provided are subject to periodic review,
          ensuring compliance with legal and ethical standards.
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          3. Data Protection and Privacy
        </h2>
        <p className="leading-relaxed">
          Fronnexus strictly complies with current data protection legislation,
          including the General Data Protection Law (LGPD) and the GDPR, when
          applicable. The collection and use of user information are limited to
          what is essential for the functioning and improvement of our services.
        </p>
        <p className="mt-2 leading-relaxed">
          Personal data is stored securely and never shared with third parties
          without explicit user consent.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          4. Intellectual Property
        </h2>
        <p className="leading-relaxed">
          All source code, design, and visual identity produced by Fronnexus are
          intellectual property of the company or its clients, as defined in the
          project contract. Unauthorized reproduction or distribution is
          strictly prohibited.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          5. Limitation of Liability
        </h2>
        <p className="leading-relaxed">
          Fronnexus is not responsible for damages or losses resulting from the
          misuse of developed solutions or from third-party integrations not
          approved by the team. Each client is responsible for maintaining
          security credentials and complying with the intended purpose of the
          product.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          6. Changes to the Terms
        </h2>
        <p className="leading-relaxed">
          Fronnexus reserves the right to modify these Terms of Responsibility
          at any time, with prior notice on our official communication channels.
          The date of the latest update will always be displayed at the top of
          this document.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          7. Contact
        </h2>
        <p className="leading-relaxed">
          If you have any questions about this document or about how Fronnexus
          handles your information, contact our support team via:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Email: support@fronnexus.com</li>
          <li>Website: https://fronnexus.com</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="text-center mt-16 text-sm text-primary-70 border-t border-white/10 pt-6">
        <p>© {new Date().getFullYear()} Fronnexus. All rights reserved.</p>
      </footer>
    </main>
  );
}
