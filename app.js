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
  page: 1,
};

const appState = {
  dataUrl: MODEL.fallbackDataUrl,
  datasetVintageMs: null,
  dataLastModified: null,
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
  indexImplementedValue: document.getElementById("indexImplementedValue"),
  indexRemainingValue: document.getElementById("indexRemainingValue"),
  indexWeightedText: document.getElementById("indexWeightedText"),
  trackerUpdated: document.getElementById("trackerUpdated"),
  statusBreakdownBar: document.getElementById("statusBreakdownBar"),
  statusBreakdownLegend: document.getElementById("statusBreakdownLegend"),
  themeGrid: document.getElementById("themeGrid"),
  sectorList: document.getElementById("sectorList"),
  searchInput: document.getElementById("searchInput"),
  themeFilter: document.getElementById("themeFilter"),
  sectorFilter: document.getElementById("sectorFilter"),
  statusFilter: document.getElementById("statusFilter"),
  horizonFilter: document.getElementById("horizonFilter"),
  sortSelect: document.getElementById("sortSelect"),
  resetFilters: document.getElementById("resetFilters"),
  visibleCount: document.getElementById("visibleCount"),
  policyTableBody: document.getElementById("policyTableBody"),
  tableCaption: document.getElementById("tableCaption"),
  pageInfo: document.getElementById("pageInfo"),
  paginationControls: document.getElementById("paginationControls"),
  datasetUpdated: document.getElementById("datasetUpdated"),
  sourceList: document.getElementById("sourceList"),
  themeTemplate: document.getElementById("themeTemplate"),
  sectorTemplate: document.getElementById("sectorTemplate"),
  policyRowTemplate: document.getElementById("policyRowTemplate"),
  proposalModal: document.getElementById("proposalModal"),
  proposalCloseButton: document.getElementById("proposalCloseButton"),
  proposalModalCode: document.getElementById("proposalModalCode"),
  proposalModalTitle: document.getElementById("proposalModalTitle"),
  proposalModalBadges: document.getElementById("proposalModalBadges"),
  proposalModalStatus: document.getElementById("proposalModalStatus"),
  proposalModalImportance: document.getElementById("proposalModalImportance"),
  proposalModalConfidence: document.getElementById("proposalModalConfidence"),
  proposalModalHorizon: document.getElementById("proposalModalHorizon"),
  proposalModalPolicy: document.getElementById("proposalModalPolicy"),
  proposalModalMeasure: document.getElementById("proposalModalMeasure"),
  proposalModalWhyWrap: document.getElementById("proposalModalWhyWrap"),
  proposalModalWhy: document.getElementById("proposalModalWhy"),
};

const money = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
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

const trackerStampFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Brussels",
});

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
const YEAR_SECONDS = YEAR_MS / 1000;
const START_MS = Date.parse(MODEL.startAt);
const ITEMS_PER_PAGE = 12;

function formatMoneyInteger(value) {
  return money.format(Math.max(0, Math.floor(value)));
}

function statusClassName(status) {
  return `status-${String(status).toLowerCase().replace(/\s+/g, "-")}`;
}

function formatPercent(value) {
  return `${numberOneDecimal.format(value * 100)}%`;
}

function truncate(text, maxLength) {
  const value = String(text || "").trim();
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
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

function trackerUpdatedMs() {
  const lastModifiedMs = Date.parse(appState.dataLastModified || "");
  if (Number.isFinite(lastModifiedMs)) {
    return lastModifiedMs;
  }

  return appState.datasetVintageMs;
}

function renderTrackerUpdatedStamp() {
  const updatedMs = trackerUpdatedMs();
  if (!updatedMs) {
    setText(elements.trackerUpdated, "Last updated: live observatory feed");
    return;
  }

  setText(elements.trackerUpdated, `Last updated: ${trackerStampFormat.format(new Date(updatedMs))}`);
}

function renderImplementationIndex() {
  const implementedShare = appState.summary.total
    ? appState.summary.implemented / appState.summary.total
    : 0;
  const remainingShareValue = 1 - implementedShare;

  setText(elements.indexImplementedValue, formatPercent(implementedShare));
  setText(elements.indexRemainingValue, formatPercent(remainingShareValue));
  setText(
    elements.indexWeightedText,
    `Weighted progress: ${formatPercent(appState.summary.weightedProgress)}`
  );
}

function renderStatusBreakdown() {
  const summary = appState.summary;
  const total = summary.total || 1;
  const segments = [
    { status: "Implemented", count: summary.implemented },
    { status: "Partially Implemented", count: summary.partial },
    { status: "In Progress", count: summary.progress },
    { status: "Not Implemented", count: summary.notImplemented },
  ];

  elements.statusBreakdownBar.innerHTML = "";
  elements.statusBreakdownLegend.innerHTML = "";

  segments.forEach((segment) => {
    const share = segment.count / total;
    const block = document.createElement("div");
    block.className = `status-segment ${statusClassName(segment.status)}`;
    block.style.width = `${share * 100}%`;
    block.title = `${segment.status}: ${segment.count} (${formatPercent(share)})`;

    if (share >= 0.11) {
      block.textContent = `${segment.count}`;
    }

    elements.statusBreakdownBar.appendChild(block);

    const item = document.createElement("article");
    item.className = "status-legend-item";

    const label = document.createElement("p");
    label.className = "status-legend-label";
    const dot = document.createElement("span");
    dot.className = `status-dot ${statusClassName(segment.status)}`;
    label.appendChild(dot);
    label.appendChild(document.createTextNode(segment.status));

    const value = document.createElement("p");
    value.className = "status-legend-value";
    value.textContent = `${segment.count} · ${formatPercent(share)}`;

    item.appendChild(label);
    item.appendChild(value);
    elements.statusBreakdownLegend.appendChild(item);
  });
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

    setText(badge, formatMoneyInteger(theme.annualCost));
    setText(title, theme.label);
    setText(value, formatMoneyInteger(cumulativeCostForTheme(theme, nowMs)));
    setText(copy, theme.description);
    progressFill.style.width = `${theme.weightedProgress * 100}%`;
    setText(
      progressNote,
      `${formatPercent(theme.weightedProgress)} weighted implementation progress`
    );
    setText(annual, formatMoneyInteger(currentAnnualCostForTheme(theme)));
    setText(rate, `${formatMoneyInteger(currentAnnualCostForTheme(theme) / YEAR_SECONDS)}/sec`);
    setText(count, `${theme.rows.length}`);
    setText(implemented, formatPercent(theme.implementedShare));

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
      `${sector.rows.length} proposals · ${formatPercent(sector.implementedShare)} fully implemented`
    );
    setText(progress, `${formatPercent(sector.weightedProgress)} weighted`);
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

function createStatusBadge(status) {
  const span = document.createElement("span");
  span.className = `status-badge ${statusClassName(status)}`;
  span.textContent = status;
  return span;
}

function createChip(className, text) {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function getVisibleRows() {
  return sortRows(appState.rows.filter(matchesFilters));
}

function openProposalModal(row) {
  setText(elements.proposalModalCode, row.code);
  setText(elements.proposalModalTitle, row.policy);
  elements.proposalModalBadges.innerHTML = "";
  elements.proposalModalBadges.appendChild(createChip("sector-chip", row.sector));
  elements.proposalModalBadges.appendChild(createChip("theme-chip", row.themeLabel));
  elements.proposalModalBadges.appendChild(
    createChip("horizon-chip", row.horizonCode === "NA" ? "No horizon" : row.horizonCode)
  );

  elements.proposalModalStatus.innerHTML = "";
  elements.proposalModalStatus.appendChild(createStatusBadge(row.status));
  setText(elements.proposalModalImportance, formatScore(row.importanceScore));
  setText(elements.proposalModalConfidence, formatScore(row.confidenceScore));
  setText(elements.proposalModalHorizon, row.horizonLabel);
  setText(elements.proposalModalPolicy, row.policy);
  setText(elements.proposalModalMeasure, row.measure);

  if (row.why) {
    elements.proposalModalWhyWrap.hidden = false;
    setText(elements.proposalModalWhy, row.why);
  } else {
    elements.proposalModalWhyWrap.hidden = true;
    setText(elements.proposalModalWhy, "");
  }

  elements.proposalModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeProposalModal() {
  elements.proposalModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function updatePaginationControls(totalPages) {
  elements.paginationControls.innerHTML = "";

  if (totalPages <= 1) {
    return;
  }

  const pages = [];
  const start = Math.max(1, state.page - 2);
  const end = Math.min(totalPages, start + 4);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  const items = [
    { label: "Prev", page: Math.max(1, state.page - 1), disabled: state.page === 1 },
    ...pages.map((page) => ({ label: String(page), page, active: page === state.page })),
    {
      label: "Next",
      page: Math.min(totalPages, state.page + 1),
      disabled: state.page === totalPages,
    },
  ];

  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pagination-button";
    button.textContent = item.label;

    if (item.active) {
      button.classList.add("is-active");
    }

    if (item.disabled) {
      button.disabled = true;
    }

    button.addEventListener("click", () => {
      if (item.disabled || item.page === state.page) {
        return;
      }

      state.page = item.page;
      renderPolicies();
    });

    elements.paginationControls.appendChild(button);
  });
}

function renderPolicies() {
  const visibleRows = getVisibleRows();
  const total = visibleRows.length;
  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  state.page = Math.min(state.page, totalPages);

  const startIndex = total === 0 ? 0 : (state.page - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, total);
  const pageRows = visibleRows.slice(startIndex, endIndex);

  elements.policyTableBody.innerHTML = "";

  if (pageRows.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 5;
    emptyCell.className = "proposal-empty-cell";
    emptyCell.textContent = "No proposals match the current filters.";
    emptyRow.appendChild(emptyCell);
    elements.policyTableBody.appendChild(emptyRow);
  }

  pageRows.forEach((row) => {
    const fragment = elements.policyRowTemplate.content.cloneNode(true);
    const tableRow = fragment.querySelector(".proposal-row");
    const idCell = fragment.querySelector(".proposal-id-cell");
    const sectorBadge = fragment.querySelector(".proposal-sector-badge");
    const policyTitle = fragment.querySelector(".proposal-policy-title");
    const subSector = fragment.querySelector(".proposal-subsector");
    const measureCell = fragment.querySelector(".proposal-measure-cell");
    const statusCell = fragment.querySelector(".proposal-status-cell");
    const themeCell = fragment.querySelector(".proposal-theme-cell");

    setText(idCell, row.code);
    setText(sectorBadge, row.sector);
    setText(policyTitle, truncate(row.policy, 180));
    setText(subSector, row.subSector);
    setText(measureCell, truncate(row.measure, 220));

    statusCell.appendChild(createStatusBadge(row.status));
    themeCell.appendChild(createChip("theme-chip", row.themeLabel));

    const open = () => openProposalModal(row);
    tableRow.addEventListener("click", open);
    tableRow.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });

    elements.policyTableBody.appendChild(fragment);
  });

  setText(elements.visibleCount, `Showing ${total} ${total === 1 ? "proposal" : "proposals"}`);
  setText(elements.tableCaption, `Filtered proposals: ${total}`);
  setText(
    elements.pageInfo,
    total === 0 ? "No results" : `Showing ${startIndex + 1}-${endIndex} of ${total} proposals`
  );
  updatePaginationControls(totalPages);
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

  setText(elements.tickerValue, formatMoneyInteger(cumulative));
  setText(
    elements.tickerSubline,
    `Counter starts ${startDateFormat.format(new Date(START_MS))}. Progress is ramped to the observatory snapshot by ${vintageText}.`
  );
  setText(elements.elapsedSince, formatElapsed(nowMs - START_MS));
  setText(elements.currentRate, `${formatMoneyInteger(annual / YEAR_SECONDS)}/sec`);
  setText(elements.currentAnnualCost, formatMoneyInteger(annual));
  setText(elements.weightedOffset, formatPercent(weightedProgress));
  setText(elements.dataNotice, appState.dataNotice);
  renderTrackerUpdatedStamp();
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
    state.page = 1;
    renderPolicies();
  });

  elements.themeFilter.addEventListener("change", (event) => {
    state.theme = event.target.value;
    state.page = 1;
    renderPolicies();
  });

  elements.sectorFilter.addEventListener("change", (event) => {
    state.sector = event.target.value;
    state.page = 1;
    renderPolicies();
  });

  elements.statusFilter.addEventListener("change", (event) => {
    state.status = event.target.value;
    state.page = 1;
    renderPolicies();
  });

  elements.horizonFilter.addEventListener("change", (event) => {
    state.horizon = event.target.value;
    state.page = 1;
    renderPolicies();
  });

  elements.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    state.page = 1;
    renderPolicies();
  });

  elements.resetFilters.addEventListener("click", () => {
    state.search = "";
    state.theme = "all";
    state.sector = "all";
    state.status = "all";
    state.horizon = "all";
    state.sort = "priority";
    state.page = 1;

    elements.searchInput.value = "";
    elements.themeFilter.value = "all";
    elements.sectorFilter.value = "all";
    elements.statusFilter.value = "all";
    elements.horizonFilter.value = "all";
    elements.sortSelect.value = "priority";

    renderPolicies();
  });

  elements.proposalCloseButton.addEventListener("click", closeProposalModal);
  elements.proposalModal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute("data-close-modal")) {
      closeProposalModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.proposalModal.hidden) {
      closeProposalModal();
    }
  });
}

function renderStatic() {
  updateSummaryCards();
  renderImplementationIndex();
  renderStatusBreakdown();
  renderThemeCards(Date.now());
  renderSectorStats();
  renderPolicies();
  renderSources();
}

function startTicker() {
  updateTicker(Date.now());
  renderThemeCards(Date.now());

  window.setInterval(() => {
    updateTicker(Date.now());
  }, 100);

  window.setInterval(() => {
    renderThemeCards(Date.now());
  }, 500);
}

async function init() {
  try {
    const loaded = await loadRows();

    appState.dataUrl = loaded.dataUrl;
    appState.datasetVintageMs = parseDatasetVintage(loaded.dataUrl);
    appState.dataLastModified = loaded.lastModified;
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
