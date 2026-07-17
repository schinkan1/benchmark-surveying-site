'use client';

import { useEffect, useRef } from 'react';
import ContactForm from '@/components/ContactForm';

export default function Site({ content }) {
  const heroRef = useRef(null);
  const needleRef = useRef(null);

  // reveal-on-scroll
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // compass needle follows cursor within the hero
  useEffect(() => {
    const hero = heroRef.current;
    const needle = needleRef.current;
    if (!hero || !needle) return;
    function onMove(e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      needle.style.transform = `rotate(${x * 14}deg)`;
    }
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, []);

  const { hero, services, process, stats, contact } = content;

  return (
    <>
      <header>
        <nav>
          <div className="brand">
            <svg className="mark" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#D4AC72" strokeWidth="1.4" />
              <path d="M12 2V22M2 12H22" stroke="#D4AC72" strokeWidth="1" />
              <circle cx="12" cy="12" r="2.6" fill="#D4AC72" />
            </svg>
            Benchmark Surveying Co.
          </div>
          <div className="navlinks">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="/photos">Photos</a>
            <a href="#trust">Credentials</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#contact" className="navcta">
            REQUEST A QUOTE
          </a>
        </nav>
      </header>

      <section className="hero" ref={heroRef}>
        <div className="hero-grid" />
        <svg
          className="contour"
          viewBox="0 0 1200 700"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50,520 C150,470 250,560 400,500 C550,440 650,530 800,480 C950,430 1050,500 1250,460"
            stroke="#B8874C"
            strokeWidth="1"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M-50,570 C150,520 260,600 410,550 C560,500 660,580 810,530 C960,480 1060,550 1250,510"
            stroke="#B8874C"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M-50,470 C150,420 240,510 390,450 C540,390 640,480 790,430 C940,380 1040,450 1250,410"
            stroke="#B8874C"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
        </svg>

        <svg className="compass" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="92" stroke="#D4AC72" strokeWidth="0.75" opacity="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#D4AC72" strokeWidth="0.5" opacity="0.35" />
          <g ref={needleRef} style={{ transformOrigin: '100px 100px' }}>
            <path d="M100 26 L110 100 L100 100 Z" fill="#D4AC72" opacity="0.9" />
            <path d="M100 174 L90 100 L100 100 Z" fill="#F7F4EC" opacity="0.55" />
          </g>
          <text x="100" y="18" fill="#D4AC72" fontFamily="IBM Plex Mono" fontSize="11" textAnchor="middle">N</text>
          <text x="100" y="190" fill="#D4AC72" fontFamily="IBM Plex Mono" fontSize="11" textAnchor="middle" opacity="0.6">S</text>
          <text x="184" y="104" fill="#D4AC72" fontFamily="IBM Plex Mono" fontSize="11" textAnchor="middle" opacity="0.6">E</text>
          <text x="16" y="104" fill="#D4AC72" fontFamily="IBM Plex Mono" fontSize="11" textAnchor="middle" opacity="0.6">W</text>
        </svg>

        <div className="wrap hero-inner">
          <div className="coord-readout mono">
            <span>{hero.coordLat}</span>
            <span>{hero.coordLng}</span>
            <span>{hero.coordElev}</span>
          </div>
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1>{hero.heading}</h1>
          <p className="lede">{hero.sub}</p>
          <div className="hero-ctas">
            <a href="#contact" className="btn-primary">REQUEST A QUOTE →</a>
            <a href="#services" className="btn-secondary">See our services</a>
          </div>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {[...services, ...services].map((s, i) => (
            <span key={i}>{s.title.toUpperCase()}</span>
          ))}
        </div>
      </div>

      <section className="services section" id="services">
        <div className="wrap">
          <div className="reveal">
            <div className="bm-label">SERVICES</div>
            <h2>Field-verified surveys, {services.length} ways.</h2>
            <p className="section-lede">
              Every project starts by re-establishing control from recorded monuments — nothing is
              estimated, nothing is assumed.
            </p>
          </div>
          <div className="service-grid reveal">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process section" id="process">
        <div className="wrap">
          <div className="reveal">
            <div className="bm-label">HOW A PROJECT RUNS</div>
            <h2>From records search to recorded plat.</h2>
            <p className="section-lede">
              Each stage is marked here the way we mark it in the field — as a benchmark, a fixed
              reference the next step builds from.
            </p>
          </div>
          <div className="bm-row reveal">
            {process.map((p, i) => (
              <div className="bm-item" key={i}>
                <div className="bm-tag">
                  {p.tag}
                  <span className="elev">{p.label}</span>
                </div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust section" id="trust">
        <div className="wrap">
          <div className="reveal">
            <div className="bm-label" style={{ color: '#D4AC72' }}>CREDENTIALS</div>
            <h2 style={{ color: '#F7F4EC' }}>Three decades of licensed work.</h2>
          </div>
          <div className="trust-grid reveal">
            {stats.map((s, i) => (
              <div className="trust-item" key={i}>
                <div className="fig">{s.fig}</div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta section-tight">
        <div className="wrap cta-inner reveal">
          <h2>Know your lines before you build, sell, or subdivide.</h2>
          <a href="#contact" className="btn-primary">REQUEST A QUOTE →</a>
        </div>
      </section>

      <section className="section-tight" id="contact">
        <div className="wrap reveal">
          <div className="bm-label">CONTACT</div>
          <h2>Tell us about your parcel.</h2>
          <p className="section-lede">
            Share a few details and a licensed surveyor will follow up with a scope and quote.
          </p>
          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="foot-brand">Benchmark Surveying Co.</div>
              <p style={{ opacity: 0.7, maxWidth: 260 }}>
                Licensed land surveyors serving the county since 1994.
              </p>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>
              <p>{contact.address}</p>
            </div>
            <div className="foot-col">
              <h4>Services</h4>
              {services.slice(0, 3).map((s, i) => (
                <a href="#services" key={i}>{s.title}</a>
              ))}
            </div>
            <div className="foot-col">
              <h4>Office Hours</h4>
              <p>{contact.hours}</p>
              <p>Field crews on-site by appointment</p>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} BENCHMARK SURVEYING CO. — {contact.license}</span>
            <span>{hero.coordLat.replace('LAT ', '')} {hero.coordLng.replace('LNG ', '')}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
