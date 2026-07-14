import { useMemo, useState } from 'react';
import './ResidentDashboard.css';

type ResidentDashboardProps = {
	onBack: () => void;
};

type FlatRecord = {
	id: string;
	label: string;
	resident: string;
	residentType: 'Owner' | 'Tenant';
	pendingAmount: number;
	pendingBills: number;
	paidAmount: number;
	paidBills: number;
};

const flats: FlatRecord[] = [
	{ id: 'flat-001', label: 'Flat 001', resident: 'Owner 1', residentType: 'Owner', pendingAmount: 2000, pendingBills: 1, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-002', label: 'Flat 002', resident: 'Owner 2', residentType: 'Owner', pendingAmount: 0, pendingBills: 0, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-003', label: 'Flat 003', resident: 'Tenant 3', residentType: 'Tenant', pendingAmount: 1200, pendingBills: 1, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-004', label: 'Flat 004', resident: 'Owner 4', residentType: 'Owner', pendingAmount: 0, pendingBills: 0, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-005', label: 'Flat 005', resident: 'Owner 5', residentType: 'Owner', pendingAmount: 0, pendingBills: 0, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-006', label: 'Flat 006', resident: 'Tenant 6', residentType: 'Tenant', pendingAmount: 800, pendingBills: 1, paidAmount: 500, paidBills: 1 },
	{ id: 'flat-007', label: 'Flat 007', resident: 'Owner 7', residentType: 'Owner', pendingAmount: 0, pendingBills: 0, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-008', label: 'Flat 008', resident: 'Owner 8', residentType: 'Owner', pendingAmount: 0, pendingBills: 0, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-009', label: 'Flat 009', resident: 'Tenant 9', residentType: 'Tenant', pendingAmount: 3400, pendingBills: 2, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-010', label: 'Flat 010', resident: 'Owner 10', residentType: 'Owner', pendingAmount: 0, pendingBills: 0, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-011', label: 'Flat 011', resident: 'Owner 11', residentType: 'Owner', pendingAmount: 0, pendingBills: 0, paidAmount: 0, paidBills: 0 },
	{ id: 'flat-012', label: 'Flat 012', resident: 'Tenant 12', residentType: 'Tenant', pendingAmount: 1600, pendingBills: 1, paidAmount: 0, paidBills: 0 },
];

const portalTabs = ['Visitors', 'Bills', 'Pay', 'Society', 'Parking', 'Profile'] as const;
const visitorTabs = ['Pre-Approved', 'Current', 'Past', 'Denied'] as const;

type PortalTab = (typeof portalTabs)[number];
type VisitorTab = (typeof visitorTabs)[number];

function ResidentDashboard({ onBack }: ResidentDashboardProps) {
	const [selectedFlatId, setSelectedFlatId] = useState('');
	const [activePortalTab, setActivePortalTab] = useState<PortalTab>('Visitors');
	const [activeVisitorTab, setActiveVisitorTab] = useState<VisitorTab>('Pre-Approved');

	const selectedFlat = useMemo(
		() => flats.find((flat) => flat.id === selectedFlatId) ?? null,
		[selectedFlatId],
	);

	if (selectedFlat) {
		return (
			<main className="resident-page resident-home-page">
				<section className="resident-hero">
					<header className="resident-home-header">
						<button
							type="button"
							className="resident-home-back"
							onClick={() => setSelectedFlatId('')}
							aria-label="Back to flat selection"
						>
							<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
							<h1>My Flat</h1>
							<p>Welcome back!</p>
						</div>
					</header>

					<section className="resident-flat-banner">
						<div>
							<h2>{selectedFlat.label}</h2>
							<p>
								{selectedFlat.resident} ({selectedFlat.residentType})
							</p>
						</div>

						<div className="resident-home-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none">
								<path
									d="M4 10.5 12 4l8 6.5V20h-5v-5h-6v5H4v-9.5Z"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</section>
				</section>

				<section className="resident-metrics">
					<article className="resident-metric pending">
						<p>Pending</p>
						<h3>{formatCurrency(selectedFlat.pendingAmount)}</h3>
						<span>{selectedFlat.pendingBills} bill(s)</span>
					</article>

					<article className="resident-metric paid">
						<p>Paid</p>
						<h3>{formatCurrency(selectedFlat.paidAmount)}</h3>
						<span>{selectedFlat.paidBills} bill(s)</span>
					</article>
				</section>

				<nav className="resident-portal-tabs" aria-label="Resident primary tabs">
					{portalTabs.map((tab) => (
						<button
							type="button"
							key={tab}
							className={`resident-portal-tab ${activePortalTab === tab ? 'active' : ''}`}
							onClick={() => setActivePortalTab(tab)}
						>
							<TabIcon type={tab} />
							<span>{tab}</span>
						</button>
					))}
				</nav>

				{activePortalTab === 'Visitors' ? (
					<section className="resident-visitors">
						<div className="resident-section-head">
							<div>
								<h4>My Visitors</h4>
								<p>Manage and track your visitors</p>
							</div>
							<button type="button" className="resident-action-btn">
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
								Add Visitor
							</button>
						</div>

						<div className="resident-subtabs" role="tablist" aria-label="Visitor statuses">
							{visitorTabs.map((tab) => (
								<button
									type="button"
									key={tab}
									className={`resident-subtab ${activeVisitorTab === tab ? 'active' : ''}`}
									onClick={() => setActiveVisitorTab(tab)}
								>
									{tab}
								</button>
							))}
						</div>

						<div className="resident-empty-state">
							<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
								<path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
							</svg>
							<p>No {activeVisitorTab.toLowerCase()} visitors</p>
							<span>Add visitors to generate entry OTP</span>
						</div>
					</section>
				) : (
					<section className="resident-panel-placeholder">
						<h4>{activePortalTab}</h4>
						<p>This section will be available in the next step.</p>
					</section>
				)}
			</main>
		);
	}

	return (
		<main className="resident-page">
			<header className="resident-topbar">
				<button type="button" className="resident-back" onClick={onBack} aria-label="Back to role selection">
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
					<h1>Epsilon Homes</h1>
					<p>Resident Portal</p>
				</div>
			</header>

			<section className="resident-card">
				<div className="resident-card-head">
					<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							d="M4 10.5 12 4l8 6.5V20h-5v-5h-6v5H4v-9.5Z"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<div>
						<h2>Select Your Flat</h2>
						<p>Choose your flat to continue</p>
					</div>
				</div>

				<label htmlFor="flatSelect" className="resident-sr-only">
					Choose your flat
				</label>
				<div className="resident-select-wrap">
						<select id="flatSelect" value={selectedFlatId} onChange={(event) => setSelectedFlatId(event.target.value)}>
						<option value="" disabled>
							Choose your flat
						</option>
							{flats.map((flat) => (
								<option value={flat.id} key={flat.id}>
									{flat.label} - {flat.resident} ({flat.residentType})
								</option>
							))}
					</select>
					<span className="resident-select-arrow" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none">
							<path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
						</svg>
					</span>
				</div>
			</section>

			<aside className="resident-note" role="note" aria-label="Resident login note">
				<strong>Note:</strong> In a real application, you would log in with your credentials. This is a
				demo version where you can select any flat.
			</aside>
		</main>
	);
}

function TabIcon({ type }: { type: PortalTab }) {
	if (type === 'Visitors') {
		return (
			<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
				<circle cx="15" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
				<path
					d="M4.5 18v-.7c0-1.3 1-2.3 2.3-2.3h4.4c1.3 0 2.3 1 2.3 2.3v.7"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
				/>
			</svg>
		);
	}

	if (type === 'Bills') {
		return (
			<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M7 4h10v16l-2.5-1.8L12 20l-2.5-1.8L7 20V4Z"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>
				<path d="M9.5 9h5M9.5 12h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		);
	}

	if (type === 'Pay') {
		return (
			<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M4 7h16v10H4z"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>
				<path d="M4 10h16M8 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		);
	}

	if (type === 'Society') {
		return (
			<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M5 20V9l7-5 7 5v11"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path d="M9 20v-4h6v4M9 11h1m4 0h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		);
	}

	if (type === 'Parking') {
		return (
			<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M6 16h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				<path
					d="M8 16 7 11h10l-1 5"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinejoin="round"
				/>
				<circle cx="9" cy="17.5" r="1" fill="currentColor" />
				<circle cx="15" cy="17.5" r="1" fill="currentColor" />
			</svg>
		);
	}

	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
			<path
				d="M6.5 18.5c.5-2.6 2.6-4 5.5-4s5 1.4 5.5 4"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function formatCurrency(value: number) {
	return new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		maximumFractionDigits: 0,
	}).format(value);
}

export default ResidentDashboard;
