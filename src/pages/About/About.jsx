import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer/Footer';
import './About.css';

function About() {
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, []);

  return (
    <>
      <Header showSearch={false} />
      <main>
        <Banner
          imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop"
          badge="Our Story · Our Mission"
          headline={<>Who We <br />Are.</>}
          subtext="We are a passionate team dedicated to bringing you the best products at the best prices."
          ctaLabel="Meet the Team ↓"
          ctaHref="#about-content"
        />
        <section className="about-content" id="about-content">
          <div className="about-content__inner">

            <div className="about-section">
              <h2 className="about-section__title">Our Mission</h2>
              <p className="about-section__body">
                We started with a simple idea: great products shouldn't be hard to find or afford.
                Our mission is to connect shoppers with top-rated items across every category —
                from electronics to everyday essentials — all in one place.
              </p>
            </div>

            <div className="about-section">
              <h2 className="about-section__title">Our Values</h2>
              <div className="about-values">
                {[
                  { icon: '🤝', title: 'Trust', body: 'We only list products we believe in, backed by genuine customer reviews.' },
                  { icon: '🌍', title: 'Sustainability', body: 'We work with suppliers who share our commitment to responsible practices.' },
                  { icon: '💡', title: 'Innovation', body: 'We constantly improve our platform to make shopping simpler and smarter.' },
                  { icon: '❤️', title: 'Community', body: 'Our customers are at the heart of everything we do.' },
                ].map(({ icon, title, body }) => (
                  <div key={title} className="about-value-card">
                    <span className="about-value-card__icon">{icon}</span>
                    <h3 className="about-value-card__title">{title}</h3>
                    <p className="about-value-card__body">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-section">
              <h2 className="about-section__title">Our Team</h2>
              <p className="about-section__body">
                Behind this platform is a small, focused team of designers, engineers, and
                customer-experience specialists who care deeply about what they build.
                We are always looking for talented people — check out our careers page.
              </p>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
