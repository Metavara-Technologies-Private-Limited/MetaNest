import { useState } from 'react';
import './LayoutDashboard.css';

type LayoutDashboardProps = {
	onBack: () => void;
};

const units = [
	{ name: 'Unit 1A', block: 'Block A', config: '2BHK - 950 sq ft', resident: '', status: 'AVAILABLE' },
	{ name: 'Unit 1B', block: 'Block A', config: '2BHK - 950 sq ft', resident: '', status: 'AVAILABLE' },
	{ name: 'Unit 1C', block: 'Block A', config: '1BHK - 650 sq ft', resident: 'Resident 13 (owner)', status: 'OCCUPIED' },
	{ name: 'Unit 1D', block: 'Block A', config: '1BHK - 650 sq ft', resident: '', status: 'AVAILABLE' },
	{ name: 'Unit 1E', block: 'Block A', config: '2BHK - 950 sq ft', resident: 'Resident 15 (tenant)', status: 'OCCUPIED' },
	{ name: 'Unit 1F', block: 'Block A', config: '1BHK - 650 sq ft', resident: 'Resident 16 (tenant)', status: 'OCCUPIED' },
	{ name: 'Unit 1G', block: 'Block B', config: '1BHK - 650 sq ft', resident: 'Resident 17 (tenant)', status: 'OCCUPIED' },
	{ name: 'Unit 1H', block: 'Block B', config: '3BHK - 1250 sq ft', resident: 'Resident 18 (tenant)', status: 'OCCUPIED' },
];

function LayoutDashboard({ onBack }: LayoutDashboardProps) {
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

	return (
		<main className="layout-page">
			<section className="layout-hero">
				<header className="layout-header">
					<button type="button" className="layout-back" onClick={onBack} aria-label="Back to dashboard">
						<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M15 6l-6 6 6 6"
								stroke="currentColor"
								strokeWidth="2.1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<div>
						<h1>Layout Management</h1>
						<p>Epsilon Homes - Space Planning</p>
					</div>
				</header>

				<div className="layout-stats">
					<StatCard label="Total" value="60" tone="pink" />
					<StatCard label="Occupied" value="35" tone="blue" />
					<StatCard label="Available" value="25" tone="blue" />
					<StatCard label="Reserved" value="0" tone="violet" />
				</div>
			</section>

			<section className="layout-controls">
				<div className="layout-field">
					<label htmlFor="floor">Floor</label>
					<select id="floor" defaultValue="floor-1">
						<option value="floor-1">Floor 1</option>
					</select>
				</div>

				<div className="layout-field">
					<label htmlFor="block">Block</label>
					<select id="block" defaultValue="all-blocks">
						<option value="all-blocks">All Blocks</option>
					</select>
				</div>

				<button
					type="button"
					className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
					onClick={() => setViewMode('grid')}
				>
					<IconGrid />
					Grid View
				</button>

				<button
					type="button"
					className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
					onClick={() => setViewMode('list')}
				>
					<IconList />
					List View
				</button>
			</section>

			<nav className="layout-breadcrumb" aria-label="Breadcrumb">
				<span>Layout Management</span>
				<span aria-hidden="true">/</span>
				<span>All Blocks</span>
				<span aria-hidden="true">/</span>
				<strong>Floor 1</strong>
			</nav>

			<section className="layout-units">
				<div className="units-head">
					<h2>All Blocks - Floor 1</h2>
					<span>10 units</span>
				</div>

				{viewMode === 'grid' ? (
					<div className="units-grid">
						{units.map((unit) => (
							<article className="unit-card" key={unit.name}>
								<div className="unit-top">
									<h3>{unit.name}</h3>
									<IconHome occupied={unit.status === 'OCCUPIED'} />
								</div>
								<p>{unit.block}</p>
								<p>{unit.config}</p>
								{unit.resident ? <p>{unit.resident}</p> : null}
								<span className={`unit-badge ${unit.status === 'OCCUPIED' ? 'occupied' : 'available'}`}>
									{unit.status}
								</span>
							</article>
						))}
					</div>
				) : (
					<div className="units-list">
						{units.map((unit) => (
							<article className="unit-row" key={unit.name}>
								<div>
									<div className="unit-row-title">
										<h3>{unit.name}</h3>
										<span className="unit-pill">{unit.block}</span>
										<span className={`unit-badge ${unit.status === 'OCCUPIED' ? 'occupied' : 'available'}`}>
											{unit.status.toLowerCase()}
										</span>
									</div>
									<p className="unit-row-meta">
										{unit.config}
										{unit.resident ? ` • ${unit.resident}` : ''}
									</p>
								</div>
								<button type="button" className="unit-edit" aria-label={`Edit ${unit.name}`}>
									<IconEdit />
								</button>
							</article>
						))}
					</div>
				)}
			</section>
		</main>
	);
}

function StatCard({ value, label, tone }: { value: string; label: string; tone: 'pink' | 'blue' | 'violet' }) {
	return (
		<article className={`layout-stat ${tone}`}>
			<strong>{value}</strong>
			<p>{label}</p>
		</article>
	);
}

function IconGrid() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<rect x="5" y="5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
			<rect x="13" y="5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
			<rect x="5" y="13" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
			<rect x="13" y="13" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.8" />
		</svg>
	);
}

function IconList() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path d="M8 7h11M8 12h11M8 17h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			<circle cx="4.5" cy="7" r="1" fill="currentColor" />
			<circle cx="4.5" cy="12" r="1" fill="currentColor" />
			<circle cx="4.5" cy="17" r="1" fill="currentColor" />
		</svg>
	);
}

function IconHome({ occupied }: { occupied: boolean }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={occupied ? 'home-occupied' : 'home-open'}>
			<path
				d="M4 10.5 12 4l8 6.5V20h-5v-5h-6v5H4v-9.5Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function IconEdit() {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<path
				d="M4 20h4l10-10-4-4L4 16v4Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<path d="m12 8 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
		</svg>
	);
}

export default LayoutDashboard;
