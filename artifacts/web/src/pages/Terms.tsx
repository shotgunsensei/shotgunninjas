import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-[var(--font-display)]">
            Terms of Service
          </h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground">
            <p>
              <strong className="text-foreground">Last updated:</strong> May 2026
            </p>

            <p>
              These Terms of Service ("Terms") govern your access to and use of
              the websites, products, and services operated by Shotgun Ninjas
              Productions, LLC ("Shotgun Ninjas", "we", "us"). By accessing or
              using any of our products you agree to these Terms.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              1. Use of Our Services
            </h2>
            <p>
              You may use our products only in compliance with these Terms and
              all applicable laws. You agree not to misuse, reverse engineer,
              interfere with, or attempt to gain unauthorized access to any
              part of our services or related systems.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              2. Accounts and Eligibility
            </h2>
            <p>
              Some products require an account. You are responsible for
              maintaining the security of your credentials and for all activity
              that occurs under your account. You must be of legal age in your
              jurisdiction to enter into these Terms.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              3. Subscriptions and Payments
            </h2>
            <p>
              Certain products and tiers are offered as paid subscriptions.
              Pricing, billing intervals, and feature access are described on
              the relevant product page. Subscriptions renew automatically until
              cancelled. You may cancel at any time from your account or by
              contacting us.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              4. Refunds
            </h2>
            <p>
              Unless explicitly stated otherwise on a product page, fees are
              non-refundable once paid. If you believe you have been charged in
              error, contact us within 30 days at john@shotgunninjas.com and we
              will review your request in good faith.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              5. Content and Intellectual Property
            </h2>
            <p>
              All software, designs, music, copy, characters, and brand assets
              published by Shotgun Ninjas Productions remain our property or
              that of our licensors. You may not copy, redistribute, or create
              derivative works without prior written permission. Music featured
              in the Sound Studio is provided for personal listening and
              download; commercial use requires a separate license.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              6. User Content
            </h2>
            <p>
              If you submit content (messages, uploads, feedback) through any of
              our products, you grant us a worldwide, non-exclusive, royalty-
              free license to use that content solely to operate, support, and
              improve the relevant service.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              7. Disclaimers
            </h2>
            <p>
              Our products are provided "as is" and "as available" without
              warranties of any kind, whether express or implied. We do not
              guarantee that any product will be uninterrupted, error-free, or
              suitable for a particular purpose.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Shotgun Ninjas Productions
              and its affiliates will not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any
              loss of data, profits, or revenue arising out of or relating to
              your use of our products.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              9. Termination
            </h2>
            <p>
              We may suspend or terminate your access to any product at any time
              for violation of these Terms or to protect our users or services.
              You may stop using our products at any time.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              10. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Material changes will
              be reflected by updating the "Last updated" date above. Your
              continued use of our products after changes take effect
              constitutes acceptance of the updated Terms.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              11. Contact
            </h2>
            <p>
              Questions about these Terms? Reach us through the{" "}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>{" "}
              or email{" "}
              <a
                href="mailto:john@shotgunninjas.com"
                className="text-primary hover:underline"
              >
                john@shotgunninjas.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
