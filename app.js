<<<<<<< HEAD
'use strict';

// ─── MODEL ───────────────────────────────────────────────────────────────────

const MODEL = {
  startDate:     new Date('2024-09-09T00:00:00Z'),
  targetYear:    2035,
  peakAnnualRate: 800_000_000_000, // €800bn/year — Draghi Report headline
  profile:       0.7,  // power-law ramp exponent; <1 = front-weighted, >1 = back-weighted
  maxRecovery:   0.75, // max cost reduction even at full implementation (path dependency)
};

// ─── STATUS META ─────────────────────────────────────────────────────────────

const STATUS_META = {
  implemented: { label: 'Implemented',  priority: 4 },
  in_progress: { label: 'In Progress',  priority: 2 },
  monitoring:  { label: 'Monitoring',   priority: 3 },
  at_risk:     { label: 'At Risk',      priority: 1 },
  not_started: { label: 'Not Started',  priority: 5 },
};

const TYPE_LABEL = {
  announcement: 'Announcement',
  status_change: 'Status Change',
  deadline: 'Deadline',
  monitoring: 'Update',
};

// ─── THEMES ──────────────────────────────────────────────────────────────────

const THEMES = [
  {
    id: 'capital-markets',
    label: 'Capital Markets & Finance',
    baselineRate: 300_000_000_000,
    desc: 'Fragmented EU capital markets trap household savings in low-yield deposits, starving firms of equity and venture capital vs US peers.',
  },
  {
    id: 'clean-energy',
    label: 'Clean Energy & Climate',
    baselineRate: 200_000_000_000,
    desc: 'EU industry pays 2–3× US electricity prices. Delayed decarbonisation transition locks in structural cost disadvantage.',
  },
  {
    id: 'technology',
    label: 'Technology & Digital',
    baselineRate: 125_000_000_000,
    desc: 'EU underinvestment in AI, cloud, and semiconductors cedes market leadership to US and China, widening the TFP gap.',
  },
  {
    id: 'defence',
    label: 'Defence & Strategic Autonomy',
    baselineRate: 100_000_000_000,
    desc: 'Fragmented national procurement and below-target defence spending create duplication and dependency, costing €100bn+/year in inefficiency.',
  },
  {
    id: 'single-market',
    label: 'Single Market Completion',
    baselineRate: 75_000_000_000,
    desc: 'Incomplete Single Market integration — particularly in services and telecoms — leaves ~10% of potential EU GDP unrealised.',
  },
];

// ─── POLICIES ────────────────────────────────────────────────────────────────

const POLICIES = [

  // ── Capital Markets & Finance ──────────────────────────────────────────────

  {
    id: 'siu',
    pillar: 'capital-markets',
    title: 'Savings & Investments Union',
    recommendation: 'Create a true EU capital market with a single rulebook for retail investment products, enabling €300bn+ of household savings to be channelled into productive European investment annually.',
    lead: 'DG FISMA / European Commission',
    status: 'in_progress',
    progress: 30,
    lastUpdate: '2025-02-19',
    nextDeadline: '2025-Q4',
    events: [
      { date: '2025-02-19', type: 'announcement', summary: 'Commission launches Savings and Investments Union consultation, replacing the stalled CMU 3.0 package.' },
      { date: '2025-06-10', type: 'status_change', summary: 'Draft SIU regulation tabled in Parliament; Council working group formed.' },
    ],
    links: [
      { label: 'SIU Consultation', url: 'https://finance.ec.europa.eu/savings-and-investments-union_en' },
    ],
  },

  {
    id: 'securitisation',
    pillar: 'capital-markets',
    title: 'Securitisation Framework Reform',
    recommendation: 'Revise the STS securitisation framework to unlock €2tn in European bank balance sheet capacity, enabling greater long-term lending to businesses and infrastructure.',
    lead: 'EBA / European Commission',
    status: 'in_progress',
    progress: 20,
    lastUpdate: '2025-03-14',
    nextDeadline: '2026-Q1',
    events: [
      { date: '2025-03-14', type: 'announcement', summary: 'Commission publishes targeted consultation on STS securitisation reform as part of SIU package.' },
    ],
    links: [
      { label: 'EBA Securitisation', url: 'https://www.eba.europa.eu/regulation-and-policy/securitisation' },
    ],
  },

  {
    id: 'eltif',
    pillar: 'capital-markets',
    title: 'ELTIF 2.0 Retail Expansion',
    recommendation: 'Scale distribution of ELTIF 2.0 European Long-Term Investment Funds to retail investors, channelling savings into infrastructure and SME equity.',
    lead: 'ESMA / Member States',
    status: 'monitoring',
    progress: 65,
    lastUpdate: '2025-01-10',
    nextDeadline: '2026-Q2',
    events: [
      { date: '2024-01-10', type: 'status_change', summary: 'ELTIF 2.0 regulation enters into force; updated ESMA guidelines published.' },
      { date: '2025-01-10', type: 'monitoring', summary: 'One year post-launch: AUM growing but retail uptake still below projections in most member states.' },
    ],
    links: [
      { label: 'ESMA ELTIF', url: 'https://www.esma.europa.eu/fund-regulations/eltif' },
    ],
  },

  // ── Clean Energy & Climate ─────────────────────────────────────────────────

  {
    id: 'energy-action-plan',
    pillar: 'clean-energy',
    title: 'Affordable Energy Action Plan',
    recommendation: 'Implement joint EU gas purchasing, electricity market reform, and demand aggregation to reduce industrial energy prices toward US and Chinese parity.',
    lead: 'DG ENER / European Commission',
    status: 'in_progress',
    progress: 25,
    lastUpdate: '2025-02-26',
    nextDeadline: '2026-Q1',
    events: [
      { date: '2025-02-26', type: 'announcement', summary: 'Commission publishes Affordable Energy Action Plan with 32 measures on electricity market design, joint purchasing, and grid investment.' },
      { date: '2025-09-15', type: 'monitoring', summary: 'Electricity market reform proposals advancing in Council; joint purchasing mechanism utilisation still limited.' },
    ],
    links: [
      { label: 'Energy Action Plan', url: 'https://energy.ec.europa.eu/affordable-energy-action-plan_en' },
    ],
  },

  {
    id: 'cbam',
    pillar: 'clean-energy',
    title: 'Carbon Border Adjustment Mechanism',
    recommendation: 'Fully operationalise CBAM to level the competitive playing field for EU industry, eliminating carbon leakage risk and enabling domestic decarbonisation without competitive disadvantage.',
    lead: 'DG TAXUD / Customs authorities',
    status: 'in_progress',
    progress: 55,
    lastUpdate: '2025-09-01',
    nextDeadline: '2026-01-01',
    events: [
      { date: '2024-09-09', type: 'status_change', summary: 'Transitional reporting phase under way; CBAM Registry operational.' },
      { date: '2025-09-01', type: 'deadline', summary: 'Transitional phase ends. Full financial obligations begin — importers must purchase CBAM certificates.' },
    ],
    links: [
      { label: 'CBAM Portal', url: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en' },
    ],
  },

  {
    id: 'renewables-permitting',
    pillar: 'clean-energy',
    title: 'Renewable Permitting Acceleration',
    recommendation: 'Implement revised Renewable Energy Directive permitting rules to cut average approval timelines from 9 years to under 2 years for wind and solar projects.',
    lead: 'Member States / REPowerEU',
    status: 'in_progress',
    progress: 40,
    lastUpdate: '2025-05-20',
    nextDeadline: '2025-Q4',
    events: [
      { date: '2024-07-01', type: 'status_change', summary: 'Revised RED III permitting rules enter into force; member states required to transpose by mid-2025.' },
      { date: '2025-05-20', type: 'monitoring', summary: 'Commission infringement review: 11 member states yet to transpose permitting acceleration measures.' },
    ],
    links: [
      { label: 'RED III', url: 'https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en' },
    ],
  },

  // ── Technology & Digital ───────────────────────────────────────────────────

  {
    id: 'ai-act',
    pillar: 'technology',
    title: 'EU AI Act — Tiered Implementation',
    recommendation: 'Implement proportionate AI regulation that protects fundamental rights without stifling EU AI development, with a risk-tiered approach that keeps general-purpose AI models globally competitive.',
    lead: 'EU AI Office / DG CONNECT',
    status: 'in_progress',
    progress: 55,
    lastUpdate: '2025-06-12',
    nextDeadline: '2026-08-02',
    events: [
      { date: '2024-08-01', type: 'status_change', summary: 'AI Act enters into force. 24-month transition for most high-risk systems; GPAI rules apply from Aug 2025.' },
      { date: '2025-06-12', type: 'status_change', summary: 'EU AI Office fully operational in Brussels; first codes of practice for GPAI models issued.' },
    ],
    links: [
      { label: 'EU AI Act', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
      { label: 'EU AI Office', url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office' },
    ],
  },

  {
    id: 'chips-act',
    pillar: 'technology',
    title: 'European Chips Act — 2030 Targets',
    recommendation: 'Accelerate EU semiconductor manufacturing capacity to reach 20% global market share by 2030, with targeted state aid and gigafab partnerships reducing dependency on Taiwan.',
    lead: 'DG GROW / Member States',
    status: 'in_progress',
    progress: 20,
    lastUpdate: '2025-10-15',
    nextDeadline: '2030-01-01',
    events: [
      { date: '2024-09-09', type: 'monitoring', summary: 'Intel Ohio and TSMC Dresden fabs announced but timelines uncertain; EU at ~8% of global chip production.' },
      { date: '2025-10-15', type: 'monitoring', summary: 'Annual Chips Act review: manufacturing investment targets unlikely to be met on current trajectory.' },
    ],
    links: [
      { label: 'European Chips Act', url: 'https://commission.europa.eu/strategy-and-policy/priorities/europe-fit-digital-age/european-chips-act_en' },
    ],
  },

  {
    id: 'ai-champions',
    pillar: 'technology',
    title: 'European AI Champions Initiative',
    recommendation: 'Mobilise €200bn in public-private AI compute infrastructure investment through EIB financing, anchor tenant contracts, and a pan-European AI R&D network.',
    lead: 'European Commission / EIB',
    status: 'in_progress',
    progress: 15,
    lastUpdate: '2025-03-19',
    nextDeadline: '2026-Q2',
    events: [
      { date: '2025-03-19', type: 'announcement', summary: 'Commission announces European AI Champions Initiative; InvestAI facility of €20bn proposed as first tranche.' },
    ],
    links: [
      { label: 'AI Champions', url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-champions-initiative' },
    ],
  },

  // ── Defence & Strategic Autonomy ───────────────────────────────────────────

  {
    id: 'edip',
    pillar: 'defence',
    title: 'European Defence Industrial Programme',
    recommendation: 'Create a common EU defence procurement framework and shared industrial base to eliminate costly duplication across 27 national defence industries.',
    lead: 'DG DEFIS / European Defence Agency',
    status: 'in_progress',
    progress: 35,
    lastUpdate: '2025-04-29',
    nextDeadline: '2025-Q4',
    events: [
      { date: '2025-02-18', type: 'announcement', summary: 'Commission proposes EDIP regulation as bridge to permanent EU defence fund.' },
      { date: '2025-04-29', type: 'status_change', summary: 'EDIP regulation adopted by European Parliament and Council; €1.5bn allocated for 2025–2027 period.' },
    ],
    links: [
      { label: 'EDIP', url: 'https://defence-industry-space.ec.europa.eu/eu-defence-industry/edip_en' },
    ],
  },

  {
    id: 'rearm-europe',
    pillar: 'defence',
    title: 'ReArm Europe / SAFE Instrument',
    recommendation: 'Unlock €800bn in European defence spending via a dedicated EU borrowing instrument, activating the national escape clause for defence spending to reach 3%+ of GDP.',
    lead: 'European Council / Member States',
    status: 'in_progress',
    progress: 30,
    lastUpdate: '2025-03-19',
    nextDeadline: '2026-Q1',
    events: [
      { date: '2025-03-19', type: 'announcement', summary: 'ReArm Europe plan announced by Commission President Von der Leyen; €150bn SAFE loans instrument proposed.' },
      { date: '2025-06-05', type: 'status_change', summary: 'SAFE regulation under negotiation; 18 member states formally activated national defence escape clause.' },
    ],
    links: [
      { label: 'ReArm Europe', url: 'https://commission.europa.eu/topics/rearm-europe_en' },
    ],
  },

  {
    id: 'defence-tech-fund',
    pillar: 'defence',
    title: 'European Defence Deep-Tech Fund',
    recommendation: 'Establish a €10bn EIB-backed fund for dual-use deep technology — drones, cyber, quantum, hypersonics — to build sovereign capability in critical defence technologies.',
    lead: 'EIB / European Defence Fund',
    status: 'not_started',
    progress: 0,
    lastUpdate: '2024-09-09',
    nextDeadline: '2027-MFF',
    events: [
      { date: '2024-09-09', type: 'monitoring', summary: 'Draghi Report identifies deep-tech defence gap; no dedicated fund proposed yet in MFF 2028–2034 discussions.' },
    ],
    links: [
      { label: 'EDF', url: 'https://defence-industry-space.ec.europa.eu/eu-defence-industry/european-defence-fund_en' },
    ],
  },

  // ── Single Market Completion ───────────────────────────────────────────────

  {
    id: 'services-market',
    pillar: 'single-market',
    title: 'Services Single Market Reform',
    recommendation: 'Remove barriers to cross-border service provision in professional, legal, and financial services — currently worth up to 4% of EU GDP in unrealised potential.',
    lead: 'DG GROW / Member States',
    status: 'at_risk',
    progress: 10,
    lastUpdate: '2025-07-01',
    nextDeadline: '2026-Q3',
    events: [
      { date: '2025-04-10', type: 'announcement', summary: 'Commission tables new Single Market strategy including proposals for services liberalisation.' },
      { date: '2025-07-01', type: 'status_change', summary: 'Council divided on services liberalisation; France and Germany blocking comprehensive reform. Status marked at risk.' },
    ],
    links: [
      { label: 'Single Market', url: 'https://single-market-economy.ec.europa.eu/single-market_en' },
    ],
  },

  {
    id: 'telecoms-union',
    pillar: 'single-market',
    title: 'European Telecoms Union',
    recommendation: 'Create a single EU telecoms market enabling pan-European operators, harmonised spectrum allocation, and 5G/6G investment at the scale needed to compete with US and Chinese networks.',
    lead: 'DG CONNECT / BEREC',
    status: 'in_progress',
    progress: 20,
    lastUpdate: '2025-05-12',
    nextDeadline: '2026-Q2',
    events: [
      { date: '2025-05-12', type: 'announcement', summary: 'Commission launches Telecom Union consultation; spectrum harmonisation proposals issued for 2025 review cycle.' },
    ],
    links: [
      { label: 'Telecoms Union', url: 'https://digital-strategy.ec.europa.eu/en/policies/telecom-union' },
    ],
  },

  {
    id: 'data-act',
    pillar: 'single-market',
    title: 'Data Act — Full Enforcement',
    recommendation: 'Ensure full Data Act implementation for seamless data portability across sectors, enabling European businesses to unlock value from industrial data estimated at €270bn by 2028.',
    lead: 'DG CONNECT / National DPAs',
    status: 'in_progress',
    progress: 55,
    lastUpdate: '2025-09-12',
    nextDeadline: '2026-09-12',
    events: [
      { date: '2025-09-12', type: 'deadline', summary: 'Data Act enforcement begins. Businesses must comply with data sharing and portability requirements.' },
      { date: '2025-11-01', type: 'monitoring', summary: 'Initial compliance rate estimated at 60%; several member states yet to designate national enforcement bodies.' },
    ],
    links: [
      { label: 'Data Act', url: 'https://digital-strategy.ec.europa.eu/en/policies/data-act' },
    ],
  },

  {
    id: 'qualifications',
    pillar: 'single-market',
    title: 'Professional Qualifications Recognition',
    recommendation: 'Extend automatic recognition of professional qualifications across all EU member states to unlock the full EU labour market and remove the 27-country barrier for mobile workers.',
    lead: 'DG GROW / Member States',
    status: 'monitoring',
    progress: 35,
    lastUpdate: '2025-08-20',
    nextDeadline: '2026-Q4',
    events: [
      { date: '2025-08-20', type: 'monitoring', summary: 'Annual review: automatic recognition covering 7 professions. Draghi target of 30+ professions not on track.' },
    ],
    links: [
      { label: 'Qualifications Directive', url: 'https://single-market-economy.ec.europa.eu/single-market/services/free-movement-professionals_en' },
    ],
  },

];

// ─── DEVELOPMENTS ────────────────────────────────────────────────────────────

const DEVELOPMENTS = [
  {
    date: '2024-09-09',
    title: 'Draghi Report Published',
    summary: 'Mario Draghi delivers "The Future of European Competitiveness" to the European Commission — 400 pages identifying a €800bn annual investment gap and 170+ reform recommendations.',
    tags: ['Milestone', 'All Themes'],
    source: 'https://commission.europa.eu/topics/eu-competitiveness/draghi-report_en',
  },
  {
    date: '2024-10-17',
    title: 'European Council Endorses Draghi Priorities',
    summary: 'EU heads of government formally endorse Draghi competitiveness agenda at October European Council, directing the new Commission to embed recommendations in its work programme.',
    tags: ['Governance', 'All Themes'],
    source: 'https://www.consilium.europa.eu/en/meetings/european-council/2024/10/17-18/',
  },
  {
    date: '2024-11-26',
    title: 'Von der Leyen II Commission Takes Office',
    summary: 'New European Commission takes office with a Competitiveness Compass explicitly drawing on the Draghi Report. Teresa Ribera and Stéphane Séjourné given cross-cutting competitiveness briefs.',
    tags: ['Governance', 'All Themes'],
    source: 'https://commission.europa.eu/index_en',
  },
  {
    date: '2025-02-19',
    title: 'Savings & Investments Union Consultation Launched',
    summary: 'Commission launches the SIU consultation to replace the stalled Capital Markets Union 3.0, targeting €300bn in annual redirected household savings toward EU productive investment.',
    tags: ['Capital Markets'],
    source: 'https://finance.ec.europa.eu/savings-and-investments-union_en',
  },
  {
    date: '2025-02-26',
    title: 'Affordable Energy Action Plan Published',
    summary: 'Commission publishes 32-measure plan to reduce energy costs for EU industry, including electricity market reform, joint purchasing, and grid investment. Responds directly to Draghi\'s energy pricing diagnosis.',
    tags: ['Clean Energy'],
    source: 'https://energy.ec.europa.eu/affordable-energy-action-plan_en',
  },
  {
    date: '2025-03-19',
    title: 'ReArm Europe Announced — €800bn Defence Plan',
    summary: 'Commission President Von der Leyen announces ReArm Europe — a €800bn mobilisation plan for European defence including the €150bn SAFE loans instrument and national escape clauses.',
    tags: ['Defence'],
    source: 'https://commission.europa.eu/topics/rearm-europe_en',
  },
  {
    date: '2025-04-29',
    title: 'EDIP Regulation Adopted',
    summary: 'European Defence Industrial Programme regulation formally adopted by Parliament and Council with €1.5bn for 2025–27. First EU-level defence industrial support mechanism.',
    tags: ['Defence'],
    source: 'https://defence-industry-space.ec.europa.eu/eu-defence-industry/edip_en',
  },
  {
    date: '2025-06-12',
    title: 'EU AI Office Fully Operational',
    summary: 'EU AI Office in Brussels reaches full operational capacity; first codes of practice for general-purpose AI models published. Marks start of GPAI compliance period under the AI Act.',
    tags: ['Technology'],
    source: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office',
  },
  {
    date: '2025-09-01',
    title: 'CBAM Full Financial Obligations Begin',
    summary: 'Transitional CBAM phase ends. EU importers of steel, cement, aluminium, fertilisers, hydrogen, and electricity must now purchase CBAM certificates, fully operationalising the carbon border mechanism.',
    tags: ['Clean Energy'],
    source: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en',
  },
  {
    date: '2025-10-15',
    title: 'Chips Act Progress Review — Targets Unlikely',
    summary: 'Annual review reveals EU semiconductor manufacturing at ~9% of global output against a 2030 target of 20%. Intel Ohio delays and revised TSMC Dresden timelines cited.',
    tags: ['Technology'],
    source: 'https://commission.europa.eu/strategy-and-policy/priorities/europe-fit-digital-age/european-chips-act_en',
  },
  {
    date: '2025-12-25',
    title: 'Draghi Observatory: 11% Implementation',
    summary: 'Draghi Observatory records 11% of report proposals as fully implemented as of December 2025 — with 89% of recommendations either in progress, not started, or stalled.',
    tags: ['Milestone', 'All Themes'],
    source: 'https://draghiobservatory.eu/',
  },
  {
    date: '2026-02-05',
    title: 'Competitiveness Compass Follow-Up Package',
    summary: 'Commission announces second tranche of Competitiveness Compass measures including Single Market reform proposals, SIU regulation, and the updated Horizons Europe R&D programme.',
    tags: ['Single Market', 'Capital Markets'],
    source: 'https://commission.europa.eu/strategy-and-policy/priorities/europe-fit-digital-age/competitiveness-compass_en',
  },
];

// ─── SOURCES ─────────────────────────────────────────────────────────────────

const SOURCES = [
  { label: 'Draghi Report — The Future of European Competitiveness', url: 'https://commission.europa.eu/topics/eu-competitiveness/draghi-report_en' },
  { label: 'Draghi Observatory — Implementation Tracker', url: 'https://draghiobservatory.eu/' },
  { label: 'European Commission — Competitiveness Compass', url: 'https://commission.europa.eu/strategy-and-policy/priorities/europe-fit-digital-age/competitiveness-compass_en' },
  { label: 'ECB — Capital Markets Union: Progress and Prospects', url: 'https://www.ecb.europa.eu/pub/economic-bulletin/articles/2024/html/ecb.ebart202408_01~6b1ccf7ef1.en.html' },
  { label: 'European Commission — Affordable Energy Action Plan', url: 'https://energy.ec.europa.eu/affordable-energy-action-plan_en' },
  { label: 'European Commission — EU AI Act', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
  { label: 'European Commission — ReArm Europe', url: 'https://commission.europa.eu/topics/rearm-europe_en' },
  { label: 'European Commission — Single Market at 30', url: 'https://single-market-economy.ec.europa.eu/single-market_en' },
];

// ─── CALCULATIONS ─────────────────────────────────────────────────────────────

function decimalYear(date) {
  const y = date.getFullYear();
  const start = new Date(y, 0, 1);
  const end   = new Date(y + 1, 0, 1);
  return y + (date - start) / (end - start);
}

const MODEL_START_YEAR = decimalYear(MODEL.startDate);

// Returns a 0–1 ramp factor for the annual rate at `date`, based on elapsed time
function rampFactor(date) {
  const totalSpan = MODEL.targetYear - MODEL_START_YEAR;
  const elapsed   = Math.max(0, decimalYear(date) - MODEL_START_YEAR);
  const t         = Math.min(elapsed / totalSpan, 1);
  return Math.pow(t, MODEL.profile);
}

// Returns average implementation progress for a given set of policies (0–1)
function avgProgress(policies) {
  if (!policies.length) return 0;
  return policies.reduce((sum, p) => sum + (p.progress / 100), 0) / policies.length;
}

// Cost discount for a theme based on implementation progress (0–maxRecovery)
function costDiscount(implFraction) {
  return implFraction * MODEL.maxRecovery;
}

// Annual rate (€/year) for a single theme at `date`
function themeAnnualRate(date, theme) {
  const pols  = POLICIES.filter(p => p.pillar === theme.id);
  const impl  = avgProgress(pols);
  const ramp  = rampFactor(date);
  return theme.baselineRate * ramp * (1 - costDiscount(impl));
}

// Cumulative cost for a theme from MODEL.startDate to `date`
// Integral of baselineRate × ramp(t) × (1 - discount) dt
// Approximated numerically (monthly steps) for accuracy with implementation changes
function themeCumulativeCost(endDate, theme) {
  const pols    = POLICIES.filter(p => p.pillar === theme.id);
  const impl    = avgProgress(pols);
  const disc    = costDiscount(impl);
  const totalSpan = MODEL.targetYear - MODEL_START_YEAR;
  const elapsed   = Math.max(0, decimalYear(endDate) - MODEL_START_YEAR);

  // Integral of baselineRate × (t/totalSpan)^profile dt from 0 to min(elapsed, totalSpan)
  const t = Math.min(elapsed, totalSpan);
  const integral = theme.baselineRate *
    Math.pow(t, MODEL.profile + 1) /
    ((MODEL.profile + 1) * Math.pow(totalSpan, MODEL.profile));

  // After targetYear, continue at peak rate
  const excessYears = Math.max(0, elapsed - totalSpan);
  const post = excessYears * theme.baselineRate;

  return (integral + post) * (1 - disc);
}

// Total cumulative cost across all themes
function totalCumulativeCost(date) {
  return THEMES.reduce((sum, theme) => sum + themeCumulativeCost(date, theme), 0);
}

// Total annual rate across all themes at `date`
function totalAnnualRate(date) {
  return THEMES.reduce((sum, theme) => sum + themeAnnualRate(date, theme), 0);
}

// Current year's total annual cost (for display)
function currentYearCost(date) {
  // Approximate by averaging Jan 1 and Dec 31 of current year
  const y    = date.getFullYear();
  const jan1 = new Date(y, 0, 1);
  const dec31 = new Date(y, 11, 31);
  return (totalAnnualRate(jan1) + totalAnnualRate(dec31)) / 2;
}

// ─── FORMATTING ──────────────────────────────────────────────────────────────

function fmtEuro(n, compact = false) {
  const abs = Math.abs(n);
  if (compact) {
    if (abs >= 1e12) return `€${(n / 1e12).toFixed(2)}tn`;
    if (abs >= 1e9)  return `€${(n / 1e9).toFixed(1)}bn`;
    if (abs >= 1e6)  return `€${(n / 1e6).toFixed(0)}m`;
    return `€${Math.round(n).toLocaleString('en-GB')}`;
  }
  if (abs >= 1e12) return `€${(n / 1e12).toFixed(3)}tn`;
  if (abs >= 1e9)  return `€${(n / 1e9).toFixed(2)}bn`;
  if (abs >= 1e6)  return `€${(n / 1e6).toFixed(0)}m`;
  return `€${Math.round(n).toLocaleString('en-GB')}`;
}

function fmtRate(ratePerSec) {
  if (ratePerSec >= 1000) return `${fmtEuro(ratePerSec, true)}/sec`;
  return `€${ratePerSec.toFixed(0)}/sec`;
}

function fmtElapsed(ms) {
  const totalSec = Math.floor(ms / 1000);
  const days     = Math.floor(totalSec / 86400);
  const hours    = Math.floor((totalSec % 86400) / 3600);
  const mins     = Math.floor((totalSec % 3600) / 60);
  const secs     = totalSec % 60;
  const pad      = n => String(n).padStart(2, '0');
  return `${days}d ${pad(hours)}h ${pad(mins)}m ${pad(secs)}s`;
}

function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso + (iso.length === 10 ? 'T00:00:00Z' : ''));
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function fmtPct(n) {
  return `${Math.round(n)}%`;
}

// ─── RENDERING ───────────────────────────────────────────────────────────────

function renderSubThemes() {
  const grid = document.getElementById('subThemeGrid');
  grid.innerHTML = '';

  THEMES.forEach(theme => {
    const pols = POLICIES.filter(p => p.pillar === theme.id);
    const impl = avgProgress(pols) * 100;

    const card = document.createElement('div');
    card.className = `sub-theme-card theme-${theme.id}`;
    card.dataset.themeId = theme.id;

    card.innerHTML = `
      <p class="sub-theme-name">${theme.label}</p>
      <div class="sub-theme-value" id="st-value-${theme.id}">€—</div>
      <div class="sub-theme-rate" id="st-rate-${theme.id}">—/sec</div>
      <div class="sub-theme-impl">
        <div class="sub-theme-impl-bar">
          <div class="sub-theme-impl-fill" style="width: ${impl.toFixed(1)}%"></div>
        </div>
        <span class="sub-theme-impl-pct">${fmtPct(impl)} done</span>
      </div>
      <div class="sub-theme-baseline">Baseline: ${fmtEuro(theme.baselineRate, true)}/yr</div>
    `;
    grid.appendChild(card);
  });
}

function updateSubThemeTickers(now) {
  THEMES.forEach(theme => {
    const cumEl   = document.getElementById(`st-value-${theme.id}`);
    const rateEl  = document.getElementById(`st-rate-${theme.id}`);
    if (!cumEl) return;

    const cum  = themeCumulativeCost(now, theme);
    const rate = themeAnnualRate(now, theme) / (365.25 * 24 * 3600);

    const prev = cumEl.dataset.prev;
    if (prev !== String(Math.floor(cum))) {
      cumEl.classList.remove('is-ticking');
      void cumEl.offsetWidth;
      cumEl.classList.add('is-ticking');
      cumEl.dataset.prev = String(Math.floor(cum));
    }

    cumEl.textContent  = fmtEuro(cum);
    rateEl.textContent = fmtRate(rate);
  });
}

function buildPolicyCard(policy) {
  const template = document.getElementById('policyTemplate');
  const clone    = template.content.cloneNode(true);
  const card     = clone.querySelector('.policy-card');

  const meta  = STATUS_META[policy.status] || STATUS_META.not_started;
  const pillarTheme = THEMES.find(t => t.id === policy.pillar);

  card.classList.add(`status-${policy.status}`);
  card.dataset.pillar  = policy.pillar;
  card.dataset.status  = policy.status;
  card.dataset.updated = policy.lastUpdate || '';
  card.dataset.title   = policy.title.toLowerCase();

  // deadline as sortable value
  const dl = policy.nextDeadline || '';
  card.dataset.deadline = dl.replace(/[^0-9]/g, '').padEnd(8, '9');

  card.querySelector('.policy-pillar').textContent    = pillarTheme ? pillarTheme.label : policy.pillar;
  card.querySelector('.policy-title').textContent     = policy.title;
  const badge = card.querySelector('.status-badge');
  badge.textContent = meta.label;
  badge.classList.add(`status-${policy.status}`);

  card.querySelector('.policy-recommendation').textContent = policy.recommendation;
  card.querySelector('.policy-lead').textContent           = policy.lead;
  card.querySelector('.policy-progress').textContent       = `${policy.progress}%`;
  card.querySelector('.progress-fill').style.width         = `${policy.progress}%`;
  card.querySelector('.policy-last-update').textContent    = fmtDate(policy.lastUpdate);
  card.querySelector('.policy-next-deadline').textContent  = policy.nextDeadline || '—';

  const eventsList = card.querySelector('.policy-events');
  (policy.events || []).forEach(ev => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="event-head">
        <span class="event-date">${fmtDate(ev.date)}</span>
        <span class="event-type">${TYPE_LABEL[ev.type] || ev.type}</span>
      </div>
      <p class="policy-event-summary">${ev.summary}</p>
    `;
    eventsList.appendChild(li);
  });

  const linksDiv = card.querySelector('.policy-links');
  (policy.links || []).forEach(lnk => {
    const a = document.createElement('a');
    a.href   = lnk.url;
    a.target = '_blank';
    a.rel    = 'noopener noreferrer';
    a.textContent = lnk.label;
    linksDiv.appendChild(a);
  });

  return clone;
}

function populateFilters() {
  const pillarSel = document.getElementById('pillarFilter');
  THEMES.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.label;
    pillarSel.appendChild(opt);
  });

  const statusSel = document.getElementById('statusFilter');
  Object.entries(STATUS_META).forEach(([key, val]) => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = val.label;
    statusSel.appendChild(opt);
  });
}

let renderedCards = []; // [{policy, element}]

function renderPolicies() {
  const grid = document.getElementById('policyList');
  grid.innerHTML = '';
  renderedCards = [];

  POLICIES.forEach(policy => {
    const node = buildPolicyCard(policy);
    // The template clone contains an <article>; append and store ref
    const article = node.querySelector('.policy-card');
    grid.appendChild(node);
    renderedCards.push({ policy, el: article });
  });

  filterAndSort();
}

function filterAndSort() {
  const search  = document.getElementById('searchInput').value.toLowerCase();
  const pillar  = document.getElementById('pillarFilter').value;
  const status  = document.getElementById('statusFilter').value;
  const sort    = document.getElementById('sortSelect').value;

  let visible = renderedCards.filter(({ policy }) => {
    if (pillar !== 'all' && policy.pillar !== pillar) return false;
    if (status !== 'all' && policy.status !== status) return false;
    if (search) {
      const haystack = `${policy.title} ${policy.recommendation} ${policy.lead}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  visible.sort((a, b) => {
    if (sort === 'priority') {
      return (STATUS_META[a.policy.status]?.priority ?? 9) - (STATUS_META[b.policy.status]?.priority ?? 9);
    }
    if (sort === 'recent') {
      return (b.policy.lastUpdate || '').localeCompare(a.policy.lastUpdate || '');
    }
    if (sort === 'deadline') {
      const da = (a.policy.nextDeadline || 'ZZZZ').replace(/[^0-9A-Z]/gi, '');
      const db = (b.policy.nextDeadline || 'ZZZZ').replace(/[^0-9A-Z]/gi, '');
      return da.localeCompare(db);
    }
    if (sort === 'alpha') {
      return a.policy.title.localeCompare(b.policy.title);
    }
    return 0;
  });

  const grid = document.getElementById('policyList');
  visible.forEach(({ el }) => grid.appendChild(el));

  renderedCards.forEach(({ el, policy }) => {
    const isVisible = visible.some(v => v.policy === policy);
    el.style.display = isVisible ? '' : 'none';
  });

  document.getElementById('visibleCount').textContent =
    `Showing ${visible.length} of ${POLICIES.length} reforms`;
}

function updateSnapshot() {
  const now = new Date();
  document.getElementById('policiesTracked').textContent    = POLICIES.length;
  document.getElementById('policiesImplemented').textContent = POLICIES.filter(p => p.status === 'implemented').length;
  document.getElementById('policiesInProgress').textContent  = POLICIES.filter(p => p.status === 'in_progress').length;
  document.getElementById('policiesAtRisk').textContent      = POLICIES.filter(p => p.status === 'at_risk').length;

  // Count policies with deadlines in the next 6 months
  const sixMonths = new Date(now);
  sixMonths.setMonth(sixMonths.getMonth() + 6);
  const upcoming = POLICIES.filter(p => {
    if (!p.nextDeadline) return false;
    const dl = new Date(p.nextDeadline.replace(/Q[1-4]/, '01-01'));
    return dl >= now && dl <= sixMonths;
  }).length;
  document.getElementById('upcomingDeadlines').textContent = upcoming;
}

function renderTimeline() {
  const list     = document.getElementById('timelineList');
  const template = document.getElementById('timelineTemplate');

  const sorted = [...DEVELOPMENTS].sort((a, b) => b.date.localeCompare(a.date));

  sorted.forEach(dev => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.timeline-date').textContent    = fmtDate(dev.date);
    clone.querySelector('.timeline-title').textContent   = dev.title;
    clone.querySelector('.timeline-summary').textContent = dev.summary;

    const tagsDiv = clone.querySelector('.timeline-tags');
    (dev.tags || []).forEach(tag => {
      const span = document.createElement('span');
      span.className   = 'timeline-tag';
      span.textContent = tag;
      tagsDiv.appendChild(span);
    });

    const sourceLink = clone.querySelector('.timeline-source');
    if (dev.source) {
      sourceLink.href        = dev.source;
      sourceLink.textContent = 'Source ↗';
    } else {
      sourceLink.remove();
    }

    list.appendChild(clone);
  });

  document.getElementById('timelineSummary').textContent =
    `${DEVELOPMENTS.length} developments tracked since 9 September 2024.`;
}

function renderSources() {
  const ul = document.getElementById('sourceList');
  SOURCES.forEach(s => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href   = s.url;
    a.target = '_blank';
    a.rel    = 'noopener noreferrer';
    a.textContent = s.label;
    li.appendChild(a);
    ul.appendChild(li);
  });

  document.getElementById('datasetUpdated').textContent =
    `Last updated: ${fmtDate(DEVELOPMENTS.map(d => d.date).sort().at(-1))}`;
}

// ─── TICKER LOOP ─────────────────────────────────────────────────────────────

function updateTicker() {
  const now     = new Date();
  const cumCost = totalCumulativeCost(now);
  const annRate = totalAnnualRate(now);
  const ratePS  = annRate / (365.25 * 24 * 3600);

  const valEl = document.getElementById('tickerValue');
  const prev  = valEl.dataset.prev;
  if (prev !== String(Math.floor(cumCost / 1e6))) {
    valEl.classList.remove('is-ticking');
    void valEl.offsetWidth; // reflow to restart animation
    valEl.classList.add('is-ticking');
    valEl.dataset.prev = String(Math.floor(cumCost / 1e6));
  }

  valEl.textContent = fmtEuro(cumCost);

  const elapsed = now - MODEL.startDate;
  document.getElementById('elapsedSince').textContent  = fmtElapsed(elapsed);
  document.getElementById('currentRate').textContent   = fmtRate(ratePS);
  document.getElementById('currentYearCost').textContent = fmtEuro(currentYearCost(now), true) + '/yr';

  updateSubThemeTickers(now);
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

function init() {
  populateFilters();
  renderSubThemes();
  renderPolicies();
  updateSnapshot();
  renderTimeline();
  renderSources();

  // Wire up controls
  ['searchInput', 'pillarFilter', 'statusFilter', 'sortSelect'].forEach(id => {
    document.getElementById(id).addEventListener('input', filterAndSort);
  });

  // Start ticker
  updateTicker();
  setInterval(updateTicker, 1000);
}

document.addEventListener('DOMContentLoaded', init);
=======
const MODEL = {
  startAt: "2024-09-09T00:00:00+02:00",
  annualBaselineCost: 800_000_000_000,
  maxRecoverableShare: 0.75,
  discoveryUrl: "https://draghiobservatory.eu/assets/js/dashboard2.js",
  fallbackDataUrl: "https://draghiobservatory.eu/assets/data/data_151225.json",
};

const STATUS_META = {
  Implemented: { label: "Implemented", rank: 4, weight: 1.0 },
  "Partially Implemented": { label: "Partially Implemented", rank: 3, weight: 0.67 },
  "In Progress": { label: "In Progress", rank: 2, weight: 0.33 },
  "Not Implemented": { label: "Not Implemented", rank: 1, weight: 0.0 },
};

const HORIZON_META = {
  ST: "Short term",
  MT: "Medium term",
  LT: "Long term",
};

const THEME_DEFINITIONS = [
  {
    id: "capital",
    label: "Capital Markets & Financing",
    annualCost: 300_000_000_000,
    description:
      "Access-to-capital, de-risking, market-finance, and scale-up reforms that should mobilise European savings into productive investment.",
    matcher(raw, haystack) {
      return [
        "capital market",
        "capital markets",
        "banking union",
        "equity",
        "listing",
        "venture",
        "financial",
        "finance",
        "investment fund",
        "access to finance",
        "access to capital",
        "export credit",
        "de-risk",
        "derisk",
      ].some((term) => haystack.includes(term));
    },
  },
  {
    id: "energy",
    label: "Energy & Industrial Decarbonisation",
    annualCost: 200_000_000_000,
    description:
      "Energy Union, industrial power prices, clean-tech deployment, grids, hydrogen, and energy-intensive industry reforms.",
    matcher(raw) {
      return ["Energy", "Clean technologies", "Energy-intensive industries"].includes(raw.sector);
    },
  },
  {
    id: "tech",
    label: "Tech, Compute & Innovation",
    annualCost: 125_000_000_000,
    description:
      "AI, cloud, semiconductors, advanced technologies, space, and pharma scale-up measures needed to close the innovation gap.",
    matcher(raw) {
      return ["Digitalisation and advanced technologies", "Space", "Pharma"].includes(raw.sector);
    },
  },
  {
    id: "defence",
    label: "Defence & Strategic Supply Chains",
    annualCost: 100_000_000_000,
    description:
      "Defence production, critical raw materials, and strategic resilience measures that reduce Europe's external dependence.",
    matcher(raw) {
      return ["Defence", "Critical raw materials"].includes(raw.sector);
    },
  },
  {
    id: "single_market",
    label: "Single Market & Connectivity",
    annualCost: 75_000_000_000,
    description:
      "Cross-border integration, interoperability, mobility, standards, transport, and market-completion reforms.",
    matcher(raw, haystack) {
      if (["Transport", "Automotive"].includes(raw.sector)) {
        return true;
      }

      return [
        "single market",
        "cross-border",
        "cross border",
        "mutual recognition",
        "interoperab",
        "passporting",
        "qualification",
        "certification",
        "mobility",
      ].some((term) => haystack.includes(term));
    },
  },
];

const SOURCES = [
  {
    label: "Draghi Observatory dashboard",
    url: "https://draghiobservatory.eu/",
  },
  {
    label: "Draghi Observatory methodology",
    url: "https://draghiobservatory.eu/methodology",
  },
  {
    label: "European Commission Draghi report page",
    url: "https://commission.europa.eu/topics/competitiveness/draghi-report_en",
  },
];

const state = {
  search: "",
  theme: "all",
  sector: "all",
  status: "all",
  horizon: "all",
  sort: "priority",
};

const appState = {
  dataUrl: MODEL.fallbackDataUrl,
  datasetVintageMs: null,
  rows: [],
  themeStats: [],
  sectorStats: [],
  summary: null,
  dataNotice: "",
};

const elements = {
  tickerValue: document.getElementById("tickerValue"),
  tickerSubline: document.getElementById("tickerSubline"),
  elapsedSince: document.getElementById("elapsedSince"),
  currentRate: document.getElementById("currentRate"),
  currentAnnualCost: document.getElementById("currentAnnualCost"),
  weightedOffset: document.getElementById("weightedOffset"),
  dataNotice: document.getElementById("dataNotice"),
  statTotal: document.getElementById("statTotal"),
  statImplemented: document.getElementById("statImplemented"),
  statPartial: document.getElementById("statPartial"),
  statProgress: document.getElementById("statProgress"),
  statNotImplemented: document.getElementById("statNotImplemented"),
  themeGrid: document.getElementById("themeGrid"),
  sectorList: document.getElementById("sectorList"),
  searchInput: document.getElementById("searchInput"),
  themeFilter: document.getElementById("themeFilter"),
  sectorFilter: document.getElementById("sectorFilter"),
  statusFilter: document.getElementById("statusFilter"),
  horizonFilter: document.getElementById("horizonFilter"),
  sortSelect: document.getElementById("sortSelect"),
  visibleCount: document.getElementById("visibleCount"),
  policyList: document.getElementById("policyList"),
  datasetUpdated: document.getElementById("datasetUpdated"),
  sourceList: document.getElementById("sourceList"),
  themeTemplate: document.getElementById("themeTemplate"),
  sectorTemplate: document.getElementById("sectorTemplate"),
  policyTemplate: document.getElementById("policyTemplate"),
};

const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const moneyCompact = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const moneyPrecise = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberOneDecimal = new Intl.NumberFormat("en-IE", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const startDateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Europe/Brussels",
});

const shortDateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeZone: "Europe/Brussels",
});

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
const YEAR_SECONDS = YEAR_MS / 1000;
const START_MS = Date.parse(MODEL.startAt);

function statusClassName(status) {
  return `status-${String(status).toLowerCase().replace(/\s+/g, "-")}`;
}

function normalizeStatus(raw) {
  const value = String(raw || "").trim().toLowerCase();

  if (value === "implemented") return "Implemented";
  if (value === "partially implemented") return "Partially Implemented";
  if (value === "in progress") return "In Progress";
  if (value === "not implemented") return "Not Implemented";

  return "Not Implemented";
}

function getJustification(raw) {
  if (raw.Rationale) {
    return String(raw.Rationale).trim();
  }

  for (let index = 1; index <= 7; index += 1) {
    const value = raw[`justification_${index}`];
    if (value && String(value).trim()) {
      return String(value).trim();
    }
  }

  return "";
}

function buildHaystack(raw) {
  return [
    raw.sector,
    raw.sub_sector,
    raw.policy,
    raw.specifics,
    raw.measure,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function themeById(themeId) {
  return THEME_DEFINITIONS.find((theme) => theme.id === themeId);
}

function assignTheme(raw, haystack) {
  for (const theme of THEME_DEFINITIONS) {
    if (theme.matcher(raw, haystack)) {
      return theme.id;
    }
  }

  return "single_market";
}

function formatScore(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `${numberOneDecimal.format(number)}/10` : "Not rated";
}

function normalizeRow(raw) {
  const haystack = buildHaystack(raw);
  const themeId = assignTheme(raw, haystack);
  const status = normalizeStatus(raw.experts_review);
  const importanceScore = Number(raw.experts_importance_score);
  const confidenceScore = Number(raw.experts_confidence_score);
  const horizonCode = String(raw.time_horizon || "").trim().toUpperCase();

  return {
    id: Number(raw.proposal_id),
    code: `DR${String(raw.proposal_id).padStart(3, "0")}`,
    sector: raw.sector || "Unknown",
    subSector: raw.sub_sector && raw.sub_sector !== "-" ? raw.sub_sector : "Not specified",
    policy: raw.policy || "No policy context supplied.",
    specifics: raw.specifics && raw.specifics !== "-" ? raw.specifics : "",
    measure: raw.measure || "No measure supplied.",
    status,
    statusWeight: STATUS_META[status].weight,
    themeId,
    themeLabel: themeById(themeId)?.label || "Single Market & Connectivity",
    horizonCode: horizonCode || "NA",
    horizonLabel: HORIZON_META[horizonCode] || "Not specified",
    importanceScore,
    confidenceScore,
    why: getJustification(raw),
    searchText: [
      raw.proposal_id,
      raw.sector,
      raw.sub_sector,
      raw.policy,
      raw.specifics,
      raw.measure,
      status,
      themeById(themeId)?.label,
      HORIZON_META[horizonCode],
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

async function resolveDatasetUrl() {
  const response = await fetch(MODEL.discoveryUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not fetch discovery asset: ${response.status}`);
  }

  const scriptText = await response.text();
  const match = scriptText.match(/assets\/data\/[\w.-]+\.json/);

  if (!match) {
    throw new Error("Dataset URL not found in dashboard asset");
  }

  return new URL(match[0], "https://draghiobservatory.eu/").href;
}

function parseDatasetVintage(url) {
  const match = String(url).match(/data_(\d{2})(\d{2})(\d{2})\.json/i);
  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = 2000 + Number(match[3]);
  const candidate = Date.UTC(year, month - 1, day);

  if (!Number.isFinite(candidate)) {
    return null;
  }

  return candidate;
}

async function fetchDataset(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not fetch dataset: ${response.status}`);
  }

  const data = await response.json();
  return {
    rows: Array.isArray(data) ? data : [],
    lastModified: response.headers.get("last-modified"),
  };
}

async function loadRows() {
  const tried = [];

  try {
    const liveUrl = await resolveDatasetUrl();
    tried.push(liveUrl);
    const result = await fetchDataset(liveUrl);

    return {
      ...result,
      dataUrl: liveUrl,
      dataNotice: "Live feed discovered from the Draghi Observatory dashboard asset.",
    };
  } catch (error) {
    tried.push(MODEL.fallbackDataUrl);
    const result = await fetchDataset(MODEL.fallbackDataUrl);

    return {
      ...result,
      dataUrl: MODEL.fallbackDataUrl,
      dataNotice: `Dataset discovery failed, so the tracker fell back to the known observatory feed. Tried: ${tried.join(", ")}`,
    };
  }
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function buildSummary(rows) {
  const counts = {
    total: rows.length,
    implemented: rows.filter((row) => row.status === "Implemented").length,
    partial: rows.filter((row) => row.status === "Partially Implemented").length,
    progress: rows.filter((row) => row.status === "In Progress").length,
    notImplemented: rows.filter((row) => row.status === "Not Implemented").length,
    weightedProgress: average(rows.map((row) => row.statusWeight)),
  };

  return counts;
}

function buildThemeStats(rows) {
  return THEME_DEFINITIONS.map((theme) => {
    const themeRows = rows.filter((row) => row.themeId === theme.id);
    const implementedShare = themeRows.length
      ? themeRows.filter((row) => row.status === "Implemented").length / themeRows.length
      : 0;

    return {
      ...theme,
      rows: themeRows,
      weightedProgress: average(themeRows.map((row) => row.statusWeight)),
      implementedShare,
    };
  });
}

function buildSectorStats(rows) {
  const sectorMap = new Map();

  rows.forEach((row) => {
    if (!sectorMap.has(row.sector)) {
      sectorMap.set(row.sector, []);
    }
    sectorMap.get(row.sector).push(row);
  });

  return [...sectorMap.entries()]
    .map(([sector, sectorRows]) => ({
      sector,
      rows: sectorRows,
      weightedProgress: average(sectorRows.map((row) => row.statusWeight)),
      implementedShare: sectorRows.filter((row) => row.status === "Implemented").length / sectorRows.length,
      counts: {
        implemented: sectorRows.filter((row) => row.status === "Implemented").length,
        partial: sectorRows.filter((row) => row.status === "Partially Implemented").length,
        progress: sectorRows.filter((row) => row.status === "In Progress").length,
        notImplemented: sectorRows.filter((row) => row.status === "Not Implemented").length,
      },
    }))
    .sort((left, right) => right.weightedProgress - left.weightedProgress);
}

function remainingShare(progress) {
  const bounded = Math.max(0, Math.min(1, progress));
  return 1 - MODEL.maxRecoverableShare * bounded;
}

function cumulativeCostForTheme(theme, nowMs) {
  if (nowMs <= START_MS) {
    return 0;
  }

  const progress = Math.max(0, Math.min(1, theme.weightedProgress));
  const rampEndMs = appState.datasetVintageMs && appState.datasetVintageMs > START_MS
    ? appState.datasetVintageMs
    : null;
  const elapsedYears = (nowMs - START_MS) / YEAR_MS;

  if (!rampEndMs) {
    return theme.annualCost * elapsedYears * remainingShare(progress);
  }

  if (nowMs <= rampEndMs) {
    const rampYears = (rampEndMs - START_MS) / YEAR_MS;
    const currentYears = (nowMs - START_MS) / YEAR_MS;
    const discountIntegral =
      currentYears -
      (MODEL.maxRecoverableShare * progress * currentYears * currentYears) / (2 * rampYears);

    return theme.annualCost * discountIntegral;
  }

  const rampYears = (rampEndMs - START_MS) / YEAR_MS;
  const rampIntegral = rampYears * (1 - (MODEL.maxRecoverableShare * progress) / 2);
  const steadyYears = (nowMs - rampEndMs) / YEAR_MS;

  return theme.annualCost * (rampIntegral + steadyYears * remainingShare(progress));
}

function currentAnnualCostForTheme(theme) {
  return theme.annualCost * remainingShare(theme.weightedProgress);
}

function formatElapsed(ms) {
  const minutes = Math.max(0, Math.floor(ms / 60000));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);
  const dayRemainder = days % 365;

  if (years > 0) {
    return `${years}y ${dayRemainder}d ${hours % 24}h`;
  }

  return `${days}d ${hours % 24}h ${minutes % 60}m`;
}

function setText(node, value) {
  node.textContent = value;
}

function appendFilterOption(select, value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  select.appendChild(option);
}

function populateFilters() {
  THEME_DEFINITIONS.forEach((theme) => appendFilterOption(elements.themeFilter, theme.id, theme.label));

  [...new Set(appState.rows.map((row) => row.sector))]
    .sort((left, right) => left.localeCompare(right))
    .forEach((sector) => appendFilterOption(elements.sectorFilter, sector, sector));

  Object.entries(STATUS_META).forEach(([status, meta]) => appendFilterOption(elements.statusFilter, status, meta.label));

  Object.entries(HORIZON_META).forEach(([code, label]) => appendFilterOption(elements.horizonFilter, code, label));
}

function updateSummaryCards() {
  const summary = appState.summary;
  setText(elements.statTotal, String(summary.total));
  setText(elements.statImplemented, String(summary.implemented));
  setText(elements.statPartial, String(summary.partial));
  setText(elements.statProgress, String(summary.progress));
  setText(elements.statNotImplemented, String(summary.notImplemented));
}

function renderThemeCards(nowMs) {
  elements.themeGrid.innerHTML = "";

  appState.themeStats.forEach((theme) => {
    const fragment = elements.themeTemplate.content.cloneNode(true);
    const badge = fragment.querySelector(".theme-badge");
    const title = fragment.querySelector(".theme-title");
    const value = fragment.querySelector(".theme-value");
    const copy = fragment.querySelector(".theme-copy");
    const progressFill = fragment.querySelector(".progress-fill");
    const progressNote = fragment.querySelector(".progress-note");
    const annual = fragment.querySelector(".theme-annual");
    const rate = fragment.querySelector(".theme-rate");
    const count = fragment.querySelector(".theme-count");
    const implemented = fragment.querySelector(".theme-implemented");

    setText(badge, moneyCompact.format(theme.annualCost));
    setText(title, theme.label);
    setText(value, money.format(cumulativeCostForTheme(theme, nowMs)));
    setText(copy, theme.description);
    progressFill.style.width = `${theme.weightedProgress * 100}%`;
    setText(
      progressNote,
      `${numberOneDecimal.format(theme.weightedProgress * 100)}% weighted implementation progress`
    );
    setText(annual, moneyCompact.format(currentAnnualCostForTheme(theme)));
    setText(rate, `${moneyPrecise.format(currentAnnualCostForTheme(theme) / YEAR_SECONDS)}/sec`);
    setText(count, `${theme.rows.length}`);
    setText(implemented, `${numberOneDecimal.format(theme.implementedShare * 100)}%`);

    elements.themeGrid.appendChild(fragment);
  });
}

function renderSectorStats() {
  elements.sectorList.innerHTML = "";

  appState.sectorStats.forEach((sector) => {
    const fragment = elements.sectorTemplate.content.cloneNode(true);
    const title = fragment.querySelector(".sector-title");
    const subline = fragment.querySelector(".sector-subline");
    const progress = fragment.querySelector(".sector-progress");
    const progressFill = fragment.querySelector(".progress-fill");
    const breakdown = fragment.querySelector(".sector-status-breakdown");

    setText(title, sector.sector);
    setText(
      subline,
      `${sector.rows.length} proposals · ${numberOneDecimal.format(sector.implementedShare * 100)}% fully implemented`
    );
    setText(progress, `${numberOneDecimal.format(sector.weightedProgress * 100)}% weighted`);
    progressFill.style.width = `${sector.weightedProgress * 100}%`;
    setText(
      breakdown,
      `Imp ${sector.counts.implemented} · Partial ${sector.counts.partial} · Progress ${sector.counts.progress} · Not ${sector.counts.notImplemented}`
    );

    elements.sectorList.appendChild(fragment);
  });
}

function matchesFilters(row) {
  const searchOk = !state.search || row.searchText.includes(state.search);
  const themeOk = state.theme === "all" || row.themeId === state.theme;
  const sectorOk = state.sector === "all" || row.sector === state.sector;
  const statusOk = state.status === "all" || row.status === state.status;
  const horizonOk = state.horizon === "all" || row.horizonCode === state.horizon;

  return searchOk && themeOk && sectorOk && statusOk && horizonOk;
}

function sortRows(rows) {
  return [...rows].sort((left, right) => {
    switch (state.sort) {
      case "importance": {
        const leftScore = Number.isFinite(left.importanceScore) ? left.importanceScore : -1;
        const rightScore = Number.isFinite(right.importanceScore) ? right.importanceScore : -1;
        if (leftScore !== rightScore) return rightScore - leftScore;
        return left.id - right.id;
      }
      case "alpha":
        return left.policy.localeCompare(right.policy);
      case "sector": {
        const sectorCompare = left.sector.localeCompare(right.sector);
        if (sectorCompare !== 0) return sectorCompare;
        return left.policy.localeCompare(right.policy);
      }
      case "priority":
      default: {
        const statusCompare = STATUS_META[left.status].rank - STATUS_META[right.status].rank;
        if (statusCompare !== 0) return statusCompare;

        const leftScore = Number.isFinite(left.importanceScore) ? left.importanceScore : -1;
        const rightScore = Number.isFinite(right.importanceScore) ? right.importanceScore : -1;
        if (leftScore !== rightScore) return rightScore - leftScore;

        return left.id - right.id;
      }
    }
  });
}

function renderPolicies() {
  const visibleRows = sortRows(appState.rows.filter(matchesFilters));
  elements.policyList.innerHTML = "";

  visibleRows.forEach((row) => {
    const fragment = elements.policyTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".policy-card");
    const code = fragment.querySelector(".policy-code");
    const title = fragment.querySelector(".policy-title");
    const preview = fragment.querySelector(".policy-measure-preview");
    const status = fragment.querySelector(".status-badge");
    const themeChip = fragment.querySelector(".theme-chip");
    const sectorChip = fragment.querySelector(".sector-chip");
    const horizonChip = fragment.querySelector(".horizon-chip");
    const context = fragment.querySelector(".policy-context");
    const measure = fragment.querySelector(".policy-measure");
    const theme = fragment.querySelector(".policy-theme");
    const sector = fragment.querySelector(".policy-sector");
    const subSector = fragment.querySelector(".policy-subsector");
    const horizon = fragment.querySelector(".policy-horizon");
    const importance = fragment.querySelector(".policy-importance");
    const confidence = fragment.querySelector(".policy-confidence");
    const whyWrap = fragment.querySelector(".policy-why-wrap");
    const why = fragment.querySelector(".policy-why");

    const statusClass = statusClassName(row.status);

    card.classList.add(statusClass);
    setText(code, row.code);
    setText(title, row.policy);
    setText(preview, row.measure);
    setText(status, row.status);
    status.classList.add(statusClass);
    setText(themeChip, row.themeLabel);
    setText(sectorChip, row.sector);
    setText(horizonChip, row.horizonCode === "NA" ? "No horizon" : row.horizonCode);
    setText(context, row.policy);
    setText(measure, row.measure);
    setText(theme, row.themeLabel);
    setText(sector, row.sector);
    setText(subSector, row.subSector);
    setText(horizon, row.horizonLabel);
    setText(importance, formatScore(row.importanceScore));
    setText(confidence, formatScore(row.confidenceScore));

    if (row.why) {
      whyWrap.hidden = false;
      setText(why, row.why);
    }

    elements.policyList.appendChild(fragment);
  });

  setText(
    elements.visibleCount,
    `Showing ${visibleRows.length} ${visibleRows.length === 1 ? "proposal" : "proposals"}`
  );
}

function renderSources() {
  elements.sourceList.innerHTML = "";

  SOURCES.forEach((source) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source.label;
    li.appendChild(link);
    elements.sourceList.appendChild(li);
  });
}

function updateTicker(nowMs) {
  const cumulative = appState.themeStats.reduce(
    (sum, theme) => sum + cumulativeCostForTheme(theme, nowMs),
    0
  );
  const annual = appState.themeStats.reduce(
    (sum, theme) => sum + currentAnnualCostForTheme(theme),
    0
  );
  const weightedProgress = appState.summary.weightedProgress;
  const vintageText = appState.datasetVintageMs
    ? shortDateFormat.format(new Date(appState.datasetVintageMs))
    : "the current observatory file";

  setText(elements.tickerValue, money.format(cumulative));
  setText(
    elements.tickerSubline,
    `Counter starts ${startDateFormat.format(new Date(START_MS))}. Progress is ramped to the observatory snapshot by ${vintageText}.`
  );
  setText(elements.elapsedSince, formatElapsed(nowMs - START_MS));
  setText(elements.currentRate, `${moneyPrecise.format(annual / YEAR_SECONDS)}/sec`);
  setText(elements.currentAnnualCost, moneyCompact.format(annual));
  setText(elements.weightedOffset, `${numberOneDecimal.format(weightedProgress * 100)}%`);
  setText(elements.dataNotice, appState.dataNotice);
  setText(
    elements.datasetUpdated,
    `Live dataset: ${appState.dataUrl.split("/").pop()}${
      appState.datasetVintageMs
        ? ` · content vintage ${shortDateFormat.format(new Date(appState.datasetVintageMs))}`
        : ""
    }`
  );
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderPolicies();
  });

  elements.themeFilter.addEventListener("change", (event) => {
    state.theme = event.target.value;
    renderPolicies();
  });

  elements.sectorFilter.addEventListener("change", (event) => {
    state.sector = event.target.value;
    renderPolicies();
  });

  elements.statusFilter.addEventListener("change", (event) => {
    state.status = event.target.value;
    renderPolicies();
  });

  elements.horizonFilter.addEventListener("change", (event) => {
    state.horizon = event.target.value;
    renderPolicies();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderPolicies();
  });
}

function renderStatic() {
  updateSummaryCards();
  renderThemeCards(Date.now());
  renderSectorStats();
  renderPolicies();
  renderSources();
}

function startTicker() {
  updateTicker(Date.now());
  renderThemeCards(Date.now());

  window.setInterval(() => {
    const nowMs = Date.now();
    updateTicker(nowMs);
    renderThemeCards(nowMs);
  }, 1000);
}

async function init() {
  try {
    const loaded = await loadRows();

    appState.dataUrl = loaded.dataUrl;
    appState.datasetVintageMs = parseDatasetVintage(loaded.dataUrl);
    appState.dataNotice = loaded.dataNotice;
    appState.rows = loaded.rows.map(normalizeRow);
    appState.summary = buildSummary(appState.rows);
    appState.themeStats = buildThemeStats(appState.rows);
    appState.sectorStats = buildSectorStats(appState.rows);

    populateFilters();
    bindEvents();
    renderStatic();
    startTicker();
  } catch (error) {
    setText(
      elements.dataNotice,
      `The tracker could not load Draghi Observatory data. ${error.message}`
    );
    setText(elements.tickerSubline, "The live data feed is unavailable.");
  }
}

init();
>>>>>>> 938b301 (Initial Draghi cost of inaction tracker)
