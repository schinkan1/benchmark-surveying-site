import ApplyForm from '@/components/ApplyForm';

export const metadata = {
  title: 'Work With Us — Benchmark Surveying Co.',
  description: 'Open field and office positions at Benchmark Surveying Co. Apply with your resume.',
};

export default function ApplyPage() {
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
            <a href="/#services">Services</a>
            <a href="/photos">Photos</a>
            <a href="/apply">Work With Us</a>
            <a href="/#contact">Contact</a>
          </div>
          <a href="/#contact" className="navcta">REQUEST A QUOTE</a>
        </nav>
      </header>

      <section className="photos-hero">
        <div className="wrap">
          <div className="bm-label" style={{ color: '#D4AC72' }}>WORK WITH US</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', maxWidth: 640 }}>
            Join a crew that gets the lines right.
          </h1>
          <p className="lede" style={{ marginBottom: 0 }}>
            We're always glad to hear from licensed surveyors, field technicians, and CAD/office
            staff. Tell us a bit about yourself and attach your resume below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ApplyForm />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
            <span>© {new Date().getFullYear()} BENCHMARK SURVEYING CO.</span>
            <a href="/">← Back to home</a>
          </div>
        </div>
      </footer>
    </>
  );
}
