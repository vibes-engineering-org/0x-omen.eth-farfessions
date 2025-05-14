"use client";

import { useEffect, useState } from "react";

interface FarfessionEntry {
  text: string;
  timestamp: number;
}

export default function Feed() {
  const [entries, setEntries] = useState<FarfessionEntry[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("farfessions");
    if (!stored) return;
    try {
      const parsed: FarfessionEntry[] = JSON.parse(stored);
      const sorted = [...parsed].sort((a, b) => b.timestamp - a.timestamp);
      setEntries(sorted.slice(0, 25));
    } catch {
      console.error("Failed to parse farfessions from localStorage");
    }
  }, []);

  if (entries.length === 0) {
    return <p className="text-center py-4">No farfessions yet</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Recent Farfessions</h3>
      <ul className="space-y-2">
        {entries.map((entry, index) => (
          <li key={index} className="border-b pb-2">
            <p className="break-words">{entry.text}</p>
            <p className="text-xs text-gray-500">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
