import React from "react";
import "./Legal.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="legal-content">
              <h1 className="legal-title">Privacy Policy</h1>
              <p className="legal-updated">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="legal-section">
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as
                  when you create an account, make a reservation, or contact us
                  for support. This may include:
                </p>
                <ul>
                  <li>
                    Personal information (name, email address, phone number)
                  </li>
                  <li>
                    Payment information (credit card details, billing address)
                  </li>
                  <li>Booking preferences and travel information</li>
                  <li>Communication preferences</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process and manage your hotel reservations</li>
                  <li>Process payments and prevent fraud</li>
                  <li>Communicate with you about your bookings</li>
                  <li>Provide customer support</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>3. Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties without your consent, except:
                </p>
                <ul>
                  <li>
                    To our payment processors (Razorpay) for payment processing
                  </li>
                  <li>To our hotel partners to fulfill your reservations</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. This includes:
                </p>
                <ul>
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing through Razorpay</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability</li>
                </ul>
              </section>
              <section className="legal-section">
                <h2>8. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.</p>
              </section>

              <section className="legal-section">
                <h2>6. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar technologies to enhance your
                  experience, analyze usage patterns, and provide personalized
                  content. You can control cookie settings through your browser
                  preferences.
                </p>
              </section>

              <section className="legal-section">
                <h2>7. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us at:
                </p>
                <div className="contact-info">
                  <p>
                    <strong>Email:</strong> privacy@hotelbooking.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Hotel Street, City, State
                    12345
                  </p>
                </div>
              </section>

              <section className="legal-section">
                <h2>8. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
