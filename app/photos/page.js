import { photos } from '@/lib/photos';

export const metadata = {
  title: 'Photos — Benchmark Surveying Co.',
  description: 'Photos from the field: boundary surveys, construction staking, and control work.',
};

function PlaceholderIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="15" rx="1.5" stroke="#B8874C" strokeWidth="1.3" />
      <circle cx="8.5" cy="11" r="2" stroke="#B8874C" strokeWidth="1.3" />
      <path d="M2 17l5.5-5 4 3.5L16 11l6 6" stroke="#B8874C" strokeWidth="1.3" />
    </svg>
  );
}

export default function PhotosPage() {
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
            <a href="/#process">Process</a>
            <a href="/photos">Photos</a>
            <a href="/#contact">Contact</a>
          </div>
          <a href="/#contact" className="navcta">REQUEST A QUOTE</a>
        </nav>
      </header>

      <section className="photos-hero">
        <div className="wrap">
          <div className="bm-label" style={{ color: '#D4AC72' }}>PHOTOS</div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', maxWidth: 600 }}>From the field.</h1>
          <p className="lede" style={{ marginBottom: 0 }}>
            A look at recent boundary surveys, control work, and construction staking.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="photo-grid">
            {photos.map((p, i) => (
              <div key={i}>
                <div className="photo-tile">
                  {p.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.src} alt={p.caption} loading="lazy" />
                  ) : (
                    <div className="photo-placeholder">
                      <PlaceholderIcon />
                      <span className="ph-label">Add photo</span>
                    </div>
                  )}
                </div>
                <p className="photo-caption">{p.caption}</p>
              </div>
            ))}
          </div>
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
