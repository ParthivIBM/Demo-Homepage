import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import './Contact.css';

function Contact() {
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, []);

  return (
    <>
      <Header showSearch={false} />
      <main>
        <Banner
          imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop"
          badge="Get In Touch · We'd Love to Hear From You"
          headline={<>Contact <br />Us.</>}
          subtext="Have a question, feedback, or just want to say hello? We're here to help."
          ctaLabel="See Contact Info ↓"
          ctaHref="#contact-content"
        />
        <section className="contact-content" id="contact-content">
          <div className="contact-content__inner">

            {/* Contact details */}
            <div className="contact-grid">
              {[
                { icon: '📍', label: 'Address', value: '123 Market Street, San Francisco, CA 94105' },
                { icon: '📞', label: 'Phone', value: '+1 (624) 423-2672' },
                { icon: '✉️', label: 'Email', value: 'support@harry.com' },
                { icon: '🕐', label: 'Hours', value: 'Mon – Fri: 9 am – 6 pm PST' },
              ].map(({ icon, label, value }) => (
                <div key={label} className="contact-card">
                  <span className="contact-card__icon">{icon}</span>
                  <div>
                    <p className="contact-card__label">{label}</p>
                    <p className="contact-card__value">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message form placeholder */}
            <div className="contact-form-wrap">
              <h2 className="contact-form-wrap__title">Send Us a Message</h2>
              <form className="contact-form">
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="cf-name">Name</label>
                    <input id="cf-name" type="text" className="contact-form__input" placeholder="Your full name" />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="cf-email">Email</label>
                    <input id="cf-email" type="email" className="contact-form__input" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-subject">Subject</label>
                  <input id="cf-subject" type="text" className="contact-form__input" placeholder="How can we help?" />
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" className="contact-form__textarea" rows={5} placeholder="Write your message here…" />
                </div>
                <button type="submit" className="contact-form__submit">Send Message →</button>
              </form>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
