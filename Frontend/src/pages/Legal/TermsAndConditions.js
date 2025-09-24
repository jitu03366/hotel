import React from 'react';
import './Legal.css';

const TermsAndConditions = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="legal-content">
              <h1 className="legal-title">Terms and Conditions</h1>
              <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using our hotel booking platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
              </section>

              <section className="legal-section">
                <h2>2. Booking Terms</h2>
                <h3>2.1 Reservation Process</h3>
                <ul>
                  <li>All bookings are subject to availability</li>
                  <li>Rates are subject to change without notice</li>
                  <li>Special requests are not guaranteed but will be accommodated when possible</li>
                  <li>You must be at least 18 years old to make a reservation</li>
                </ul>

                <h3>2.2 Payment Terms</h3>
                <ul>
                  <li>Payment is required at the time of booking</li>
                  <li>We accept major credit cards and digital payment methods</li>
                  <li>All prices are inclusive of applicable taxes unless otherwise stated</li>
                  <li>Currency conversion rates are approximate and may vary</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>3. Cancellation and Refund Policy</h2>
                <h3>3.1 Cancellation Terms</h3>
                <ul>
                  <li>Free cancellation up to 24 hours before check-in</li>
                  <li>Cancellations within 24 hours are non-refundable</li>
                  <li>No-shows will be charged the full amount</li>
                  <li>Group bookings (5+ rooms) have different cancellation terms</li>
                </ul>

                <h3>3.2 Refund Processing</h3>
                <ul>
                  <li>Refunds will be processed within 5-10 business days</li>
                  <li>Refunds will be credited to the original payment method</li>
                  <li>Processing fees may apply to certain refunds</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>4. Guest Responsibilities</h2>
                <ul>
                  <li>Provide accurate and complete information during booking</li>
                  <li>Present valid identification at check-in</li>
                  <li>Comply with hotel policies and local laws</li>
                  <li>Respect other guests and hotel property</li>
                  <li>Report any issues or damages immediately</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>5. Hotel Policies</h2>
                <h3>5.1 Check-in/Check-out</h3>
                <ul>
                  <li>Check-in: 3:00 PM onwards</li>
                  <li>Check-out: 11:00 AM</li>
                  <li>Early check-in and late check-out subject to availability</li>
                </ul>

                <h3>5.2 Additional Charges</h3>
                <ul>
                  <li>Incidental charges may apply for additional services</li>
                  <li>Damage to hotel property will result in additional charges</li>
                  <li>Smoking in non-smoking rooms will incur cleaning fees</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>6. Limitation of Liability</h2>
                <p>Our liability is limited to the total amount paid for your reservation. We are not liable for:</p>
                <ul>
                  <li>Loss or damage to personal belongings</li>
                  <li>Injuries or accidents on hotel premises</li>
                  <li>Service interruptions or technical issues</li>
                  <li>Third-party services or activities</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>7. Force Majeure</h2>
                <p>We are not liable for any failure to perform our obligations due to circumstances beyond our control, including but not limited to natural disasters, government actions, or other force majeure events.</p>
              </section>

              <section className="legal-section">
                <h2>8. Privacy and Data Protection</h2>
                <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.</p>
              </section>

              <section className="legal-section">
                <h2>9. Dispute Resolution</h2>
                <p>Any disputes arising from these terms will be resolved through binding arbitration in accordance with the laws of the jurisdiction where our company is registered.</p>
              </section>

              <section className="legal-section">
                <h2>10. Modifications</h2>
                <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our service constitutes acceptance of the modified terms.</p>
              </section>

              <section className="legal-section">
                <h2>11. Contact Information</h2>
                <p>For questions about these Terms and Conditions, please contact us:</p>
                <div className="contact-info">
                  <p><strong>Email:</strong> legal@hotelbooking.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Hotel Street, City, State 12345</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
