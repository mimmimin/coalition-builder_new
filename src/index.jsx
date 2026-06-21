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

const ParliamentBar = ({ parties }) => {
  return (
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
};

const CoalitionBar = ({ coalitionSeats }) => {
  const percentage = (coalitionSeats / TOTAL_SEATS) * 100;
  const hasMajority = coalitionSeats >= MAJORITY_THRESHOLD;
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-8 rounded-lg overflow-hidden relative">
        <div className="h-full bg-gray-200 w-full"></div>
        <div
          className={`h-full absolute top-0 left-0 \${
            hasMajority ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${percentage}%` }}
          title={`${coalitionSeats} seats`}
        />
      </div>
      <span
        className={`text-2xl font-bold \${
          hasMajority ? "text-green-600" : "text-blue-600"
        }`}
      >
        {coalitionSeats}
      </span>
    </div>
  );
};

const PartyCard = ({
  party,
  selectedSubgroups,
  onPartyClick,
  onSubgroupToggle,
  groupFilter,
  expanded,
}) => {
  const partySubgroups = party.subgroups.filter(
    (sg) =>
      sg.name.toLowerCase().includes(groupFilter.toLowerCase()) ||
      party.name.toLowerCase().includes(groupFilter.toLowerCase())
  );

  const allSelected = partySubgroups.every((sg) =>
    selectedSubgroups.has(sg.name)
  );
  const partySeats = partySubgroups.reduce(
    (sum, sg) => sum + sg.seats,
    0
  );
  const selectedSeats = partySubgroups
    .filter((sg) => selectedSubgroups.has(sg.name))
    .reduce((sum, sg) => sum + sg.seats, 0);

  return (
    <div className="mb-4">
      <div
        className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-200 cursor-pointer"
        onClick={() => onPartyClick(party.id)}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: party.color }}
        ></div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">
            {party.name} - {party.fullName}
          </div>
          <div className="text-sm text-gray-500">{partySeats} seats total</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">{selectedSeats}</div>
          <div className="text-xs text-gray-500">selected</div>
        </div>
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={allSelected}
          onChange={(e) => {
            e.stopPropagation();
            onPartyClick(party.id);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {expanded && (
        <div className="mt-2 space-y-1">
          {partySubgroups.map((subgroup) => {
            const isSelected = selectedSubgroups.has(subgroup.name);
            return (
              <div
                key={subgroup.name}
                className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm hover:bg-gray-100"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="appearance-none w-4 h-4 border-2 border-gray-300 rounded cursor-pointer checked:bg-green-500 checked:border-green-500 checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2020%2020%22%20fill=%22white%22%3E%3Cpath%20fill-rule=%22evenodd%22%20d=%22M16
