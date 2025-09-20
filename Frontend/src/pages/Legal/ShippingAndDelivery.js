import React from 'react';
import './Legal.css';

const ShippingAndDelivery = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="legal-content">
              <h1 className="legal-title">Shipping and Delivery Policy</h1>
              <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="legal-section">
                <h2>1. Service Delivery</h2>
                <p>Our hotel booking platform provides instant digital services. All bookings, confirmations, and related services are delivered electronically through our secure platform.</p>
                
                <div className="policy-highlight">
                  <h3>Instant Digital Delivery</h3>
                  <ul>
                    <li><strong>Booking Confirmations:</strong> Immediate email confirmation</li>
                    <li><strong>Receipts:</strong> Instant digital receipts</li>
                    <li><strong>Vouchers:</strong> Digital vouchers delivered via email</li>
                    <li><strong>Updates:</strong> Real-time booking status updates</li>
                  </ul>
                </div>
              </section>

              <section className="legal-section">
                <h2>2. Digital Service Delivery</h2>
                
                <h3>2.1 Booking Confirmation</h3>
                <ul>
                  <li>Instant confirmation upon successful payment</li>
                  <li>Email confirmation sent within 5 minutes</li>
                  <li>SMS notification (if phone number provided)</li>
                  <li>Confirmation accessible in your account dashboard</li>
                </ul>

                <h3>2.2 Digital Receipts and Invoices</h3>
                <ul>
                  <li>Immediate receipt generation after payment</li>
                  <li>PDF format for easy printing and storage</li>
                  <li>Tax-compliant invoices for business bookings</li>
                  <li>Available for download from your account</li>
                </ul>

                <h3>2.3 Booking Modifications</h3>
                <ul>
                  <li>Instant updates to your booking details</li>
                  <li>Email notifications for all changes</li>
                  <li>Updated confirmations sent immediately</li>
                  <li>Real-time availability checking</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>3. Physical Delivery (If Applicable)</h2>
                <p>In rare cases where physical items need to be delivered:</p>
                
                <h3>3.1 Delivery Areas</h3>
                <ul>
                  <li>Limited to hotel premises only</li>
                  <li>Special arrangements for group bookings</li>
                  <li>Corporate event materials</li>
                  <li>Welcome packages (upon request)</li>
                </ul>

                <h3>3.2 Delivery Timeline</h3>
                <ul>
                  <li><strong>Standard Delivery:</strong> 2-3 business days</li>
                  <li><strong>Express Delivery:</strong> 1 business day (additional charges apply)</li>
                  <li><strong>Same Day:</strong> Available for urgent requests (premium pricing)</li>
                </ul>

                <h3>3.3 Delivery Charges</h3>
                <ul>
                  <li>Free delivery for bookings over $500</li>
                  <li>Standard delivery: $15</li>
                  <li>Express delivery: $25</li>
                  <li>Same-day delivery: $40</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>4. Digital Service Availability</h2>
                
                <h3>4.1 Platform Availability</h3>
                <ul>
                  <li>24/7 booking system availability</li>
                  <li>99.9% uptime guarantee</li>
                  <li>Maintenance windows announced in advance</li>
                  <li>Mobile-optimized for all devices</li>
                </ul>

                <h3>4.2 Service Delivery Standards</h3>
                <ul>
                  <li>Booking processing: Under 30 seconds</li>
                  <li>Email delivery: Within 5 minutes</li>
                  <li>SMS delivery: Within 2 minutes</li>
                  <li>Customer support response: Under 2 hours</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>5. Delivery Confirmation</h2>
                
                <h3>5.1 Digital Delivery Confirmation</h3>
                <ul>
                  <li>Email delivery receipts</li>
                  <li>Read receipts for important communications</li>
                  <li>Account activity logs</li>
                  <li>Delivery status tracking</li>
                </ul>

                <h3>5.2 Physical Delivery Confirmation</h3>
                <ul>
                  <li>Signature required for physical items</li>
                  <li>Photo confirmation for contactless delivery</li>
                  <li>Delivery tracking numbers</li>
                  <li>Hotel staff acknowledgment</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>6. Failed Delivery Handling</h2>
                
                <h3>6.1 Digital Delivery Issues</h3>
                <ul>
                  <li>Automatic retry for failed email delivery</li>
                  <li>Alternative delivery methods (SMS, phone)</li>
                  <li>Manual resending upon request</li>
                  <li>Account dashboard access as backup</li>
                </ul>

                <h3>6.2 Physical Delivery Issues</h3>
                <ul>
                  <li>Three delivery attempts</li>
                  <li>Return to sender after failed attempts</li>
                  <li>Customer notification of delivery issues</li>
                  <li>Refund or reshipment options</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>7. International Delivery</h2>
                <p>For international bookings and services:</p>
                <ul>
                  <li>Digital services available worldwide</li>
                  <li>Localized content and currency</li>
                  <li>Compliance with local regulations</li>
                  <li>Multi-language support</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>8. Delivery Tracking</h2>
                
                <h3>8.1 Digital Tracking</h3>
                <ul>
                  <li>Real-time booking status updates</li>
                  <li>Email delivery status</li>
                  <li>Account activity history</li>
                  <li>Notification preferences</li>
                </ul>

                <h3>8.2 Physical Tracking</h3>
                <ul>
                  <li>Tracking numbers for physical items</li>
                  <li>Real-time location updates</li>
                  <li>Estimated delivery times</li>
                  <li>Delivery confirmation</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>9. Customer Responsibilities</h2>
                <ul>
                  <li>Provide accurate contact information</li>
                  <li>Check email regularly for confirmations</li>
                  <li>Ensure email filters don't block our messages</li>
                  <li>Keep account information up to date</li>
                  <li>Be available for physical delivery if required</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>10. Delivery Support</h2>
                <p>If you experience any delivery issues:</p>
                <div className="contact-info">
                  <p><strong>Technical Support:</strong> +1 (555) 123-4567</p>
                  <p><strong>Email Support:</strong> delivery@hotelbooking.com</p>
                  <p><strong>Live Chat:</strong> Available 24/7 on our website</p>
                  <p><strong>Response Time:</strong> Under 2 hours for urgent issues</p>
                </div>
              </section>

              <section className="legal-section">
                <h2>11. Policy Updates</h2>
                <p>This shipping and delivery policy may be updated to reflect changes in our services or legal requirements. Updates will be posted on this page with the revision date.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;
