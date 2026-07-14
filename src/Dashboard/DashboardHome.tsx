import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const modules = [
  {
    title: 'MetaNest Homes',
    subtitle: 'Property Operations',
    accent: 'blue',
    icon: 'building',
    features: [
      'Lease and maintenance tracking',
      'Resident and owner management',
      'Billing, notices, and reports',
      'Portfolio visibility across sites',
    ],
    cta: 'Open Module',
  },
  {
    title: 'MetaNest Layout Management',
    subtitle: 'Layout Planning',
    accent: 'violet',
    icon: 'grid',
    features: [
      'Floor plan organization',
      'Space allocation tracking',
      'Plan editing and optimization',
      'Operational dashboards',
    ],
    cta: 'Open Module',
  },
] as const;

function DashboardHome() {
  const navigate = useNavigate();
  const [showHomesRole, setShowHomesRole] = useState(false);

  if (showHomesRole) {
    return (
      <main className="page-shell role-page-shell">
        <section className="role-card" aria-label="MetaNest Homes role selection">
          <button
            type="button"
            className="role-back"
            onClick={() => setShowHomesRole(false)}
            aria-label="Back to projects"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="role-back-icon">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Projects
          </button>

          <div className="role-icon" aria-hidden="true">
            <Icon type="building" />
          </div>

          <h1>MetaNest Homes</h1>
          <p className="role-subtitle">Apartment Monthly Maintenance</p>

          <div className="role-actions">
            <button
              type="button"
              className="role-choice active"
              onClick={() => navigate('/home/admin')}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M16 18v-1.2c0-1.3-1-2.3-2.3-2.3h-3.4c-1.3 0-2.3 1-2.3 2.3V18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M18.5 9.5h3m-1.5-1.5v3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Admin
            </button>

            <button
              type="button"
              className="role-choice"
              onClick={() => navigate('/home/resident')}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="15" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M4.5 18v-.7c0-1.3 1-2.3 2.3-2.3h4.4c1.3 0 2.3 1 2.3 2.3v.7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M10.5 18v-.7c0-1.3 1-2.3 2.3-2.3h4.4c1.3 0 2.3 1 2.3 2.3v.7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Resident
            </button>
          </div>

          <p className="role-hint">Choose your role to continue</p>
        </section>
      </main>
    );
  }
            <h1>MetaNest Homes</h1>
  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="hero">
        <div className="brand-mark" aria-hidden="true">
          M
        </div>
        <p className="eyebrow">MetaNest</p>
        <h1>Choose a workspace to continue</h1>
        <p className="hero-copy">
          A focused entry point for property operations and space planning.
        </p>
      </section>

      <section className="module-grid" aria-label="Available modules">
        {modules.map((module) => (
          <article className={`module-card ${module.accent}`} key={module.title}>
            <div className="card-top">
              <div className="card-icon" aria-hidden="true">
                <Icon type={module.icon} />
              </div>
              <span className="chevron" aria-hidden="true">
                ›
              </span>
            </div>

            <div className="card-content">
              <h2>{module.title}</h2>
              <p className="card-subtitle">{module.subtitle}</p>
              <ul>
                {module.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="module-button"
              onClick={() => {
                if (module.title === 'MetaNest Homes') {
                  setShowHomesRole(true);
                } else {
                  navigate('/layout');
                }
              }}
            >
              {module.cta}
            </button>
          </article>
        ))}
      </section>

      <footer className="footer">MetaNest Integrated Property Management Solutions</footer>
    </main>
  );
}

function Icon({ type }: { type: 'building' | 'grid' }) {
  if (type === 'building') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 20V7.5c0-.83.67-1.5 1.5-1.5h4V4h3v2h4.5c.83 0 1.5.67 1.5 1.5V20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 20v-3m4 3v-3m4 3v-3M9 10h2m4 0h2M9 13h2m4 0h2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default DashboardHome;