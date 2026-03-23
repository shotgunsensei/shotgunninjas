import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground">
            <p>
              <strong className="text-foreground">Last updated:</strong> January 2025
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when you fill out
              a contact form, create an account, or communicate with us. This may include
              your name, email address, and any messages you send.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              How We Use Your Information
            </h2>
            <p>
              We use the information we collect to respond to your inquiries, provide our
              services, improve our products, and communicate with you about updates and
              offerings that may interest you.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect
              your personal information against unauthorized access, alteration, disclosure,
              or destruction.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              Cookies
            </h2>
            <p>
              We may use cookies and similar tracking technologies to enhance your experience
              on our website. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              Third-Party Services
            </h2>
            <p>
              We may use third-party services that collect, monitor, and analyze data to
              improve our service. These third parties have their own privacy policies.
            </p>

            <h2 className="text-xl font-bold text-foreground font-[var(--font-display)]">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through
              our contact page or email us at john@shotgunninjas.com.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
