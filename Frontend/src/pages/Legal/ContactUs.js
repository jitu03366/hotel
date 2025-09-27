import React, { useState } from "react";
import "./Legal.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert(
      "Thank you for your message. We will get back to you within 24 hours."
    );
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: "general",
    });
  };

  return (
    <div className="legal-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="legal-content">
              <h1 className="legal-title">Contact Us</h1>
              <p className="legal-updated">
                We&apos;re here to help! Get in touch with us through any of the
                methods below.
              </p>

              <div className="row">
                <div className="col-lg-8">
                  <section className="legal-section">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="contact-form">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="inquiryType">Inquiry Type</label>
                            <select
                              id="inquiryType"
                              name="inquiryType"
                              value={formData.inquiryType}
                              onChange={handleInputChange}
                              className="form-control"
                            >
                              <option value="general">General Inquiry</option>
                              <option value="booking">Booking Support</option>
                              <option value="cancellation">
                                Cancellation/Refund
                              </option>
                              <option value="technical">
                                Technical Support
                              </option>
                              <option value="billing">Billing Question</option>
                              <option value="complaint">Complaint</option>
                              <option value="feedback">Feedback</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="form-control"
                          rows="5"
                          required
                          placeholder="Please provide as much detail as possible..."
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </form>
                  </section>
                </div>

                <div className="col-lg-4">
                  <section className="legal-section">
                    <h2>Contact Information</h2>

                    <div className="contact-method">
                      <h4>
                        <i className="fas fa-phone"></i> Phone Support
                      </h4>
                      <p>
                        <strong>24/7 Customer Service:</strong>
                      </p>
                      <p>+1 (555) 123-4567</p>
                      <p>
                        <strong>Business Hours:</strong> 9 AM - 6 PM EST
                      </p>
                    </div>

                    <div className="contact-method">
                      <h4>
                        <i className="fas fa-envelope"></i> Email Support
                      </h4>
                      <p>
                        <strong>General Inquiries:</strong>
                      </p>
                      <p>info@hotelbooking.com</p>
                      <p>
                        <strong>Support:</strong> support@hotelbooking.com
                      </p>
                      <p>
                        <strong>Billing:</strong> billing@hotelbooking.com
                      </p>
                    </div>

                    <div className="contact-method">
                      <h4>
                        <i className="fas fa-map-marker-alt"></i> Office Address
                      </h4>
                      <p>
                        123 Hotel Street
                        <br />
                        Suite 100
                        <br />
                        City, State 12345
                        <br />
                        United States
                      </p>
                    </div>

                    <div className="contact-method">
                      <h4>
                        <i className="fas fa-clock"></i> Response Times
                      </h4>
                      <ul>
                        <li>
                          <strong>Email:</strong> Within 24 hours
                        </li>
                        <li>
                          <strong>Phone:</strong> Immediate during business
                          hours
                        </li>
                        <li>
                          <strong>Live Chat:</strong> Under 5 minutes
                        </li>
                        <li>
                          <strong>Social Media:</strong> Within 2 hours
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>

              <section className="legal-section">
                <h2>Frequently Asked Questions</h2>

                <div className="faq-item">
                  <h4>How do I modify or cancel my booking?</h4>
                  <p>
                    You can modify or cancel your booking through your account
                    dashboard, by calling our customer service, or by emailing
                    us with your booking reference number.
                  </p>
                </div>

                <div className="faq-item">
                  <h4>What payment methods do you accept?</h4>
                  <p>
                    We accept all major credit cards (Visa, MasterCard, American
                    Express), debit cards, and digital payment methods through
                    our secure payment processor Razorpay.
                  </p>
                </div>

                <div className="faq-item">
                  <h4>Is my personal information secure?</h4>
                  <p>
                    Yes, we use industry-standard encryption and security
                    measures to protect your personal and payment information.
                    Please review our Privacy Policy for more details.
                  </p>
                </div>

                <div className="faq-item">
                  <h4>How do I get a receipt for my booking?</h4>
                  <p>
                    Receipts are automatically generated and sent to your email
                    after successful payment. You can also download them from
                    your account dashboard.
                  </p>
                </div>

                <div className="faq-item">
                  <h4>What if I have a complaint about my stay?</h4>
                  <p>
                    We take all complaints seriously. Please contact our
                    customer service team immediately, and we will work with the
                    hotel to resolve any issues to your satisfaction.
                  </p>
                </div>
              </section>

              <section className="legal-section">
                <h2>Social Media</h2>
                <p>
                  Follow us on social media for updates, special offers, and
                  travel tips:
                </p>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <i className="fab fa-facebook"></i> Facebook
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-twitter"></i> Twitter
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                  <a href="#" className="social-link">
                    <i className="fab fa-linkedin"></i> LinkedIn
                  </a>
                </div>
              </section>

              <section className="legal-section">
                <h2>Business Hours</h2>
                <div className="business-hours">
                  <div className="row">
                    <div className="col-md-6">
                      <h4>Customer Service</h4>
                      <ul>
                        <li>Monday - Friday: 9:00 AM - 6:00 PM EST</li>
                        <li>Saturday: 10:00 AM - 4:00 PM EST</li>
                        <li>Sunday: 12:00 PM - 4:00 PM EST</li>
                        <li>Emergency Support: 24/7</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h4>Technical Support</h4>
                      <ul>
                        <li>Monday - Friday: 8:00 AM - 8:00 PM EST</li>
                        <li>Saturday: 9:00 AM - 5:00 PM EST</li>
                        <li>Sunday: 10:00 AM - 4:00 PM EST</li>
                        <li>
                          System Maintenance: Sundays 2:00 AM - 4:00 AM EST
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
