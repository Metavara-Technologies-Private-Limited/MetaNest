import { useMemo, useState } from 'react';
import './AdminDashboard.css';

const tabs = ['Dashboard', 'Generate', 'Bills', 'Entries', 'Committee', 'Master'] as const;

type TabKey = (typeof tabs)[number];

type AdminDashboardProps = {
	onBack: () => void;
};

function AdminDashboard({ onBack }: AdminDashboardProps) {
	const [activeTab, setActiveTab] = useState<TabKey>('Dashboard');

	const tabBody = useMemo(() => {
		if (activeTab === 'Dashboard') {
			return <DashboardTab />;
		}

		if (activeTab === 'Generate') {
			return <Placeholder title="Generate" detail="Create and schedule bills for selected periods." />;
		}

		if (activeTab === 'Bills') {
			return <Placeholder title="Bills" detail="Review bill history, statuses, and reminders." />;
		}

		if (activeTab === 'Entries') {
			return <Placeholder title="Entries" detail="Track payment entries and reconciliations." />;
		}

		if (activeTab === 'Committee') {
			return <Placeholder title="Committee" detail="Manage committee roles and announcements." />;
		}

		return <Placeholder title="Master" detail="Configure society setup, units, and defaults." />;
	}, [activeTab]);

	return (
		<main className="admin-page">
			<header className="admin-topbar">
				<button type="button" className="admin-back" onClick={onBack} aria-label="Back to role selection">
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="back-icon">
						<path
							d="M15 6l-6 6 6 6"
							stroke="currentColor"
							strokeWidth="2.2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
				<div>
					<h1>Epsilon Homes - Admin</h1>
					<p>Manage bills and payments</p>
				</div>
			</header>

			<nav className="admin-tabs" aria-label="Admin tabs">
				{tabs.map((tab) => (
					<button
						key={tab}
						type="button"
						onClick={() => setActiveTab(tab)}
						className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
					>
						{tab}
					</button>
				))}
			</nav>

			<section className="admin-content" aria-live="polite">
				{tabBody}
			</section>
		</main>
	);
}

function DashboardTab() {
	return (
		<div className="dashboard-layout">
			<section className="metrics-grid">
				<article className="metric-card">
					<p>Total Collection</p>
					<h2>₹0</h2>
					<span className="ok">0 bills paid</span>
				</article>

				<article className="metric-card">
					<p>Pending Amount</p>
					<h2 className="danger">₹0</h2>
					<span className="danger">0 pending</span>
				</article>

				<article className="metric-card">
					<p>This Month</p>
					<h2>₹0</h2>
					<span>Jul 2026</span>
				</article>

				<article className="metric-card">
					<p>Collection Rate</p>
					<h2 className="accent">0%</h2>
					<span>Overall</span>
				</article>
			</section>

			<section className="panel">
				<h3>Bills Overview</h3>
				<div className="status-row paid">
					<span>Paid Bills</span>
					<strong>0</strong>
				</div>
				<div className="status-row pending">
					<span>Pending Bills</span>
					<strong>0</strong>
				</div>
			</section>

			<section className="panel">
				<h3>Society Stats</h3>
				<div className="stats-grid">
					<article className="stat-card blue">
						<strong>60</strong>
						<p>Total Flats</p>
					</article>
					<article className="stat-card violet">
						<strong>0</strong>
						<p>Total Bills</p>
					</article>
				</div>
			</section>
		</div>
	);
}

function Placeholder({ title, detail }: { title: string; detail: string }) {
	return (
		<div className="panel placeholder">
			<h3>{title}</h3>
			<p>{detail}</p>
		</div>
	);
}

export default AdminDashboard;
