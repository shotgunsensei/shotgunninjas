import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: January 2026</p>

          <div className="space-y-10 text-foreground/90">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Shotgun Ninjas Productions, LLC ("we," "us," or "our") operates the TorqueShed mobile application 
                ("TorqueShed" or "the App") and the website{" "}
                <a href="https://shotgunninjas.com" className="text-primary hover:underline">
                  https://shotgunninjas.com
                </a>.
              </p>
              <p className="leading-relaxed mt-4">
                Your privacy matters. This Privacy Policy explains what information we collect, how we use it, 
                and the choices you have regarding your data when you use TorqueShed.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-3">a. Information You Provide</h3>
              <p className="leading-relaxed mb-2">When using TorqueShed, you may voluntarily provide:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-foreground/80">
                <li>Account information (such as username, email address)</li>
                <li>Profile information</li>
                <li>Messages, posts, comments, or other content you submit within the app</li>
                <li>Support or feedback communications</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">b. Automatically Collected Information</h3>
              <p className="leading-relaxed mb-2">We may automatically collect limited technical data, including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-foreground/80">
                <li>Device type and operating system</li>
                <li>App version</li>
                <li>Anonymous usage statistics (e.g., feature interactions, crash reports)</li>
                <li>IP address (used only for security, fraud prevention, or analytics)</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">c. Cookies & Similar Technologies</h3>
              <p className="leading-relaxed mb-2">TorqueShed and associated services may use cookies or similar technologies to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-foreground/80">
                <li>Maintain session state</li>
                <li>Improve performance and reliability</li>
                <li>Analyze usage trends</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. How We Use Information</h2>
              <p className="leading-relaxed mb-2">We use collected information to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-foreground/80">
                <li>Provide and operate TorqueShed features</li>
                <li>Maintain user accounts and authentication</li>
                <li>Enable community interactions and messaging</li>
                <li>Improve app functionality, stability, and user experience</li>
                <li>Respond to support requests</li>
                <li>Ensure platform security and prevent abuse</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Data Sharing</h2>
              <p className="leading-relaxed font-medium mb-4">We do not sell personal data.</p>
              <p className="leading-relaxed mb-2">We may share limited data only:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-foreground/80">
                <li>With service providers that support app infrastructure (e.g., hosting, analytics)</li>
                <li>When required by law, regulation, or valid legal process</li>
                <li>To protect the rights, safety, or integrity of users or the platform</li>
              </ul>
              <p className="leading-relaxed mt-4">
                All third-party services are expected to comply with applicable privacy and security standards.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Data Retention</h2>
              <p className="leading-relaxed mb-2">We retain user data only as long as necessary to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-foreground/80">
                <li>Provide TorqueShed services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Users may request deletion of their account and associated data.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. User Choices & Rights</h2>
              <p className="leading-relaxed mb-2">You may:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-foreground/80">
                <li>Update or correct your account information</li>
                <li>Request account deletion</li>
                <li>Disable optional analytics where available</li>
                <li>Contact us with privacy-related questions or requests</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Requests can be submitted using the contact details below.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Children's Privacy</h2>
              <p className="leading-relaxed">
                TorqueShed is not intended for children under 13.
                We do not knowingly collect personal information from children.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Security</h2>
              <p className="leading-relaxed">
                We take reasonable technical and organizational measures to protect user data.
                However, no system is 100% secure, and use of the app is at your own risk.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time.
                Changes will be posted on this page with an updated "Last updated" date.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Contact Information</h2>
              <p className="leading-relaxed mb-4">
                If you have questions or concerns about this Privacy Policy or your data:
              </p>
              <div className="bg-card/50 border border-border rounded-lg p-6 space-y-2">
                <p className="font-semibold text-foreground">Shotgun Ninjas Productions, LLC</p>
                <p>
                  Email:{" "}
                  <a href="mailto:privacy@shotgunninjas.com" className="text-primary hover:underline">
                    privacy@shotgunninjas.com
                  </a>
                  {" "}(or{" "}
                  <a href="mailto:support@shotgunninjas.com" className="text-primary hover:underline">
                    support@shotgunninjas.com
                  </a>)
                </p>
                <p>
                  Website:{" "}
                  <a href="https://shotgunninjas.com" className="text-primary hover:underline">
                    https://shotgunninjas.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
