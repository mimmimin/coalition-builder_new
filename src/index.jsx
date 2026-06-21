import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const TOTAL_SEATS = 720;
const MAJORITY_THRESHOLD = 361;

const parties = [
  {
    id: "epp",
    name: "EPP",
    fullName: "European People's Party",
    color: "#3399FF",
    seats: 176,
    subgroups: [
      { name: "CDU/CSU (Germany)", seats: 45 },
      { name: "Forza Italia (Italy)", seats: 24 },
      { name: "PP (Spain)", seats: 22 },
      { name: "Les Républicains (France)", seats: 18 },
      { name: "ÖVP (Austria)", seats: 7 },
      { name: "PO (Poland)", seats: 15 },
      { name: "CD&V (Belgium)", seats: 8 },
      { name: "Moderaterna (Sweden)", seats: 7 },
      { name: "Kokoomus (Finland)", seats: 6 },
      { name: "PSD (Portugal)", seats: 5 },
      { name: "Fine Gael (Ireland)", seats: 4 },
      { name: "ND (Greece)", seats: 5 },
      { name: "CDS-PP (Portugal)", seats: 3 },
      { name: "KDU-ČSL (Czechia)", seats: 2 },
      { name: "Other EPP", seats: 5 },
    ],
  },
  {
    id: "s-d",
    name: "S&D",
    fullName: "Progressive Alliance of Socialists and Democrats",
    color: "#FF0000",
    seats: 145,
    subgroups: [
      { name: "SPD (Germany)", seats: 27 },
      { name: "PD (Italy)", seats: 19 },
      { name: "PSOE (Spain)", seats: 21 },
      { name: "PS (France)", seats: 13 },
      { name: "SPÖ (Austria)", seats: 5 },
      { name: "Labour (UK)", seats: 14 },
      { name: "PSD (Romania)", seats: 12 },
      { name: "PASOK (Greece)", seats: 8 },
      { name: "PS (Belgium)", seats: 7 },
      { name: "SDP (Croatia)", seats: 5 },
      { name: "Other S&D", seats: 14 },
    ],
  },
  {
    id: "renew",
    name: "Renew",
    fullName: "Renew Europe",
    color: "#FFD700",
    seats: 102,
    subgroups: [
      { name: "FDP (Germany)", seats: 5 },
      { name: "LREM (France)", seats: 23 },
      { name: "Ciudadanos (Spain)", seats: 7 },
      { name: "Italia Viva (Italy)", seats: 7 },
      { name: "NEOS (Austria)", seats: 1 },
      { name: "Venstre (Denmark)", seats: 8 },
      { name: "D66 (Netherlands)", seats: 7 },
      { name: "Open VLD (Belgium)", seats: 6 },
      { name: "Centre Party (Sweden)", seats: 5 },
      { name: "Other Renew", seats: 33 },
    ],
  },
  {
    id: "greens",
    name: "Greens/EFA",
    fullName: "Greens/European Free Alliance",
    color: "#009900",
    seats: 74,
    subgroups: [
      { name: "Grüne (Germany)", seats: 21 },
      { name: "EELV (France)", seats: 12 },
      { name: "Verdes (Spain)", seats: 7 },
      { name: "Groen (Belgium)", seats: 3 },
      { name: "GroenLinks (Netherlands)", seats: 7 },
      { name: "Ecolo (Belgium)", seats: 5 },
      { name: "Miljöpartiet (Sweden)", seats: 4 },
      { name: "Vihr (Finland)", seats: 2 },
      { name: "Other Greens", seats: 13 },
    ],
  },
  {
    id: "id",
    name: "PfE",
    fullName: "Patriots for Europe",
    color: "#000000",
    seats: 59,
    subgroups: [
      { name: "Lega (Italy)", seats: 23 },
      { name: "RN (France)", seats: 23 },
      { name: "AfD (Germany)", seats: 9 },
      { name: "FPÖ (Austria)", seats: 3 },
      { name: "SNS (Slovakia)", seats: 1 },
    ],
  },
  {
    id: "ecr",
    name: "ECR",
    fullName: "European Conservatives and Reformists",
    color: "#0000FF",
    seats: 68,
    subgroups: [
      { name: "PiS (Poland)", seats: 27 },
      { name: "FdI (Italy)", seats: 10 },
      { name: "Vox (Spain)", seats: 6 },
      { name: "N-VA (Belgium)", seats: 6 },
      { name: "Ja (Slovenia)", seats: 4 },
      { name: "Conservatives (UK)", seats: 5 },
      { name: "Other ECR", seats: 10 },
    ],
  },
  {
    id: "left",
    name: "The Left",
    fullName: "The Left in the European Parliament",
    color: "#990000",
    seats: 39,
    subgroups: [
      { name: "Die Linke (Germany)", seats: 5 },
      { name: "Podemos (Spain)", seats: 6 },
      { name: "FI (France)", seats: 6 },
      { name: "Syriza (Greece)", seats: 5 },
      { name: "Bloco (Portugal)", seats: 4 },
      { name: "Razem (Poland)", seats: 3 },
      { name: "KSH (Hungary)", seats: 2 },
      { name: "Other Left", seats: 8 },
    ],
  },
];

// === COMPONENTS ===
const ParliamentBar = ({ parties }) => (
  <div className="flex h-8 rounded-lg overflow-hidden mb-4">
    {parties.map((party) => {
      const percentage = (party.seats / TOTAL_SEATS) * 100;
      return (
        <div
          key={party.id}
          className="h-full"
          style={{ width: `${percentage}%`, backgroundColor: party.color }}
          title={`${party.fullName} (${party.seats} seats)`}
        />
      );
    })}
  </div>
);

const CoalitionBar = ({ coalitionSeats }) => {
  const percentage = (coalitionSeats / TOTAL_SEATS) * 100;
  const hasMajority = coalitionSeats >= MAJORITY_THRESHOLD;
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-8 rounded-lg overflow-hidden relative">
        <div className="h-full bg-gray-200 w-full"></div>
        <div
          className={`h-full absolute top-0 left-0 ${
            hasMajority ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-2xl font-bold ${hasMajority ? "text-green-600" : "text-blue-600"}`}>
        {coalitionSeats}
      </span>
    </div>
  );
};

const PartyCard = ({ party, selectedSubgroups, onPartyClick, onSubgroupToggle, groupFilter, expanded }) => {
  const partySubgroups = party.subgroups.filter(
    (sg) => sg.name.toLowerCase().includes(groupFilter.toLowerCase()) || party.name.toLowerCase().includes(groupFilter.toLowerCase())
  );
  const allSelected = partySubgroups.every((sg) => selectedSubgroups.has(sg.name));
  const partySeats = partySubgroups.reduce((sum, sg) => sum + sg.seats, 0);
  const selectedSeats = partySubgroups.filter((sg) => selectedSubgroups.has(sg.name)).reduce((sum, sg) => sum + sg.seats, 0);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-200 cursor-pointer" onClick={() => onPartyClick(party.id)}>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: party.color }}></div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{party.name} - {party.fullName}</div>
          <div className="text-sm text-gray-500">{partySeats} seats total</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">{selectedSeats}</div>
          <div className="text-xs text-gray-500">selected</div>
        </div>
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-gray-300 text-blue-600"
          checked={allSelected}
          onChange={(e) => { e.stopPropagation(); onPartyClick(party.id); }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {expanded && (
        <div className="mt-2 space-y-1">
          {partySubgroups.map((subgroup) => {
            const isSelected = selectedSubgroups.has(subgroup.name);
            return (
              <div key={subgroup.name} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm hover:bg-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border-2 border-gray-300 rounded cursor-pointer checked:bg-green-500 checked:border-green-500"
                    checked={isSelected}
                    onChange={() => onSubgroupToggle(party.id, subgroup.name, subgroup.seats)}
                  />
                  <span>{subgroup.name}</span>
                </label>
                <span className="font-medium text-gray-700">{subgroup.seats} seats</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Summary = ({ coalitionSeats }) => {
  const hasMajority = coalitionSeats >= MAJORITY_THRESHOLD;
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <h3 className="font-medium text-gray-900 mb-2">Coalition Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Total seats in coalition:</span>
          <span className="font-bold">{coalitionSeats}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Majority threshold:</span>
          <span className="font-bold">{MAJORITY_THRESHOLD}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Status:</span>
          <span className={`font-bold ${hasMajority ? "text-green-600" : "text-red-500"}`}>
            {hasMajority ? "✓ Majority achieved!" : "✗ No majority"}
          </span>
        </div>
      </div>
    </div>
  );
};

// === MAIN APP ===
const CoalitionBuilder = () => {
  const [selectedSubgroups, setSelectedSubgroups] = useState(new Map());
  const [groupFilter, setGroupFilter] = useState("");
  const [expandedParties, setExpandedParties] = useState(new Set());

  const coalitionSeats = Array.from(selectedSubgroups.values()).reduce((sum, sg) => sum + sg.seats, 0);

  const toggleParty = (partyId) => {
    const party = parties.find((p) => p.id === partyId);
    if (!party) return;
    const allSelected = party.subgroups.every((sg) => selectedSubgroups.has(sg.name));
    setSelectedSubgroups((prev) => {
      const newMap = new Map(prev);
      if (allSelected) party.subgroups.forEach((sg) => newMap.delete(sg.name));
      else party.subgroups.forEach((sg) => newMap.set(sg.name, sg));
      return newMap;
    });
    setExpandedParties((prev) => {
      const newSet = new Set(prev);
      newSet.has(partyId) ? newSet.delete(partyId) : newSet.add(partyId);
      return newSet;
    });
  };

  const toggleSubgroup = (partyId, subgroupName, seats) => {
    setSelectedSubgroups((prev) => {
      const newMap = new Map(prev);
      newMap.has(subgroupName) ? newMap.delete(subgroupName) : newMap.set(subgroupName, { name: subgroupName, seats });
      return newMap;
    });
  };

  const clearAll = () => {
    setSelectedSubgroups(new Map());
    setExpandedParties(new Set());
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen p-4 md:p-6">
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">EU Parliament Coalition Builder</h1>
            <p className="text-gray-600 mt-1">
              Total seats: {TOTAL_SEATS} | Coalition: {coalitionSeats} seats
              {coalitionSeats >= MAJORITY_THRESHOLD && <span className="ml-2 text-green-600 font-semibold">(Majority!)</span>}
            </p>
          </div>
          <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full self-start md:self-center">
            Majority threshold: {MAJORITY_THRESHOLD} seats
          </span>
        </div>
      </header>

      <main className="space-y-6">
        <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Parliament Composition</h2>
          <ParliamentBar parties={parties} />
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Coalition</h2>
          <CoalitionBar coalitionSeats={coalitionSeats} />
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Select Parties & Subgroups</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                placeholder="Filter parties..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
              />
              {groupFilter && (
                <button onClick={() => setGroupFilter("")} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg">
                  ×
                </button>
              )}
            </div>
          </div>
          <div className="space-y-2">
            {parties.map((party) => (
              <PartyCard
                key={party.id}
                party={party}
                selectedSubgroups={selectedSubgroups}
                onPartyClick={toggleParty}
                onSubgroupToggle={toggleSubgroup}
                groupFilter={groupFilter}
                expanded={expandedParties.has(party.id)}
              />
            ))}
          </div>
        </section>

        <Summary coalitionSeats={coalitionSeats} />

        <button onClick={clearAll} className="w-full p-3 border border-gray-300 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700 font-medium">
          Clear All
        </button>
      </main>
    </div>
  );
};

// === RENDER ===
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CoalitionBuilder />
  </React.StrictMode>
);
