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
    path: '/login',
  },
  {
    title: 'Space Studio',
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
    path: null,
  },
] as const;

function DashboardHome() {
  const navigate = useNavigate();

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
              disabled={!module.path}
              onClick={() => module.path && navigate(module.path)}
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