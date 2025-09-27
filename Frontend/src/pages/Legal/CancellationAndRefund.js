import React from "react";
import "./Legal.css";

const CancellationAndRefund = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="legal-content">
              <h1 className="legal-title">Cancellation and Refund Policy</h1>
              <p className="legal-updated">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="legal-section">
                <h2>1. General Cancellation Policy</h2>
                <p>
                  We understand that plans can change. Our cancellation policy
                  is designed to be fair to both our guests and our hotel
                  partners.
                </p>

                <div className="policy-highlight">
                  <h3>Standard Cancellation Terms</h3>
                  <ul>
                    <li>
                      <strong>Free Cancellation:</strong> Up to 24 hours before
                      check-in
                    </li>
                    <li>
                      <strong>Partial Refund:</strong> 50% refund for
                      cancellations within 24 hours
                    </li>
                    <li>
                      <strong>No Refund:</strong> For no-shows or same-day
                      cancellations
                    </li>
                  </ul>
                </div>
              </section>

              <section className="legal-section">
                <h2>2. Booking Types and Cancellation Rules</h2>

                <h3>2.1 Standard Bookings</h3>
                <ul>
                  <li>Free cancellation up to 24 hours before check-in</li>
                  <li>50% refund for cancellations within 24 hours</li>
                  <li>No refund for no-shows</li>
                </ul>

                <h3>2.2 Non-Refundable Bookings</h3>
                <ul>
                  <li>
                    These bookings offer discounted rates but cannot be
                    cancelled
                  </li>
                  <li>No refunds under any circumstances</li>
                  <li>Clearly marked during the booking process</li>
                </ul>

                <h3>2.3 Group Bookings (5+ rooms)</h3>
                <ul>
                  <li>Free cancellation up to 7 days before check-in</li>
                  <li>50% refund for cancellations within 7 days</li>
                  <li>No refund for cancellations within 48 hours</li>
                </ul>

                <h3>2.4 Special Events and Peak Season</h3>
                <ul>
                  <li>Different cancellation terms may apply</li>
                  <li>Terms will be clearly displayed during booking</li>
                  <li>May require longer notice periods</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>3. Refund Processing</h2>

                <h3>3.1 Refund Timeline</h3>
                <ul>
                  <li>
                    <strong>Credit Card:</strong> 5-10 business days
                  </li>
                  <li>
                    <strong>Debit Card:</strong> 7-14 business days
                  </li>
                  <li>
                    <strong>Bank Transfer:</strong> 10-15 business days
                  </li>
                  <li>
                    <strong>Digital Wallets:</strong> 1-3 business days
                  </li>
                </ul>

                <h3>3.2 Refund Method</h3>
                <ul>
                  <li>Refunds are processed to the original payment method</li>
                  <li>We cannot process refunds to different accounts</li>
                  <li>Processing fees may apply to certain payment methods</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>4. Special Circumstances</h2>

                <h3>4.1 Force Majeure Events</h3>
                <p>
                  In case of natural disasters, government restrictions, or
                  other force majeure events, we will work with you to:
                </p>
                <ul>
                  <li>Reschedule your booking at no additional cost</li>
                  <li>
                    Provide full refunds when rescheduling is not possible
                  </li>
                  <li>Offer credit for future bookings</li>
                </ul>

                <h3>4.2 Medical Emergencies</h3>
                <p>For documented medical emergencies, we may offer:</p>
                <ul>
                  <li>Full refunds with proper documentation</li>
                  <li>Rescheduling without penalties</li>
                  <li>Case-by-case consideration</li>
                </ul>

                <h3>4.3 Hotel Issues</h3>
                <p>
                  If the hotel cannot honor your reservation due to their
                  issues:
                </p>
                <ul>
                  <li>Full refund guaranteed</li>
                  <li>Assistance finding alternative accommodations</li>
                  <li>Compensation for inconvenience</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>5. How to Cancel</h2>

                <h3>5.1 Online Cancellation</h3>
                <ul>
                  <li>Log into your account</li>
                  <li>Go to &quot;My Bookings&quot;</li>
                  <li>Select the booking to cancel</li>
                  <li>Follow the cancellation prompts</li>
                </ul>

                <h3>5.2 Phone Cancellation</h3>
                <ul>
                  <li>Call our customer service: +1 (555) 123-4567</li>
                  <li>Have your booking reference number ready</li>
                  <li>Available 24/7 for assistance</li>
                </ul>

                <h3>5.3 Email Cancellation</h3>
                <ul>
                  <li>Send email to: support@hotelbooking.com</li>
                  <li>Include booking reference and reason for cancellation</li>
                  <li>Response within 2 hours during business hours</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>6. Refund Exceptions</h2>
                <p>
                  The following situations may affect your refund eligibility:
                </p>
                <ul>
                  <li>Fraudulent bookings or payment disputes</li>
                  <li>Violation of hotel policies</li>
                  <li>Booking made with incorrect information</li>
                  <li>Third-party booking complications</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>7. Processing Fees</h2>
                <ul>
                  <li>No fees for standard cancellations</li>
                  <li>Processing fees may apply for certain payment methods</li>
                  <li>
                    Currency conversion fees may apply for international refunds
                  </li>
                  <li>Fees will be clearly disclosed before processing</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>8. Dispute Resolution</h2>
                <p>If you disagree with a refund decision:</p>
                <ul>
                  <li>Contact our customer service team first</li>
                  <li>Provide supporting documentation</li>
                  <li>Escalate to management if needed</li>
                  <li>We aim to resolve all disputes fairly and promptly</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>9. Contact Information</h2>
                <p>For cancellation and refund inquiries:</p>
                <div className="contact-info">
                  <p>
                    <strong>Customer Service:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Email:</strong> support@hotelbooking.com
                  </p>
                  <p>
                    <strong>Refund Inquiries:</strong> refunds@hotelbooking.com
                  </p>
                  <p>
                    <strong>Business Hours:</strong> 24/7 for urgent matters
                  </p>
                </div>
              </section>

              <section className="legal-section">
                <h2>10. Policy Updates</h2>
                <p>
                  This cancellation and refund policy may be updated from time
                  to time. Any changes will be posted on this page with an
                  updated revision date. We encourage you to review this policy
                  periodically.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationAndRefund;
