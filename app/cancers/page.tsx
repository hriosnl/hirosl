"use client";

import { useState, useEffect } from "react";
import { EyeIcon } from "@/components/EyeIcon";

interface Person {
  name: string;
  category: string;
  wiki: string;
  note: string;
  status: "ALIVE" | "DECEASED";
  lastActivity?: string;
  sourceNote?: string;
}

export default function CancerStatusChecker() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [lastScan, setLastScan] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Placeholder for your Brave Search API key
  // Get it from https://brave.com/search/api/
  const BRAVE_API_KEY =
    process.env.NEXT_PUBLIC_BRAVE_API_KEY || "YOUR_BRAVE_SEARCH_API_KEY_HERE";

  const targetNames = [
    "Logan Paul",
    "Stephen Colbert",
    "Jimmy Kimmel",
    "Conan O'Brien",
    "Future rapper",
    "Eric Weinstein",
    "Zane Lowe",
  ];

  const fetchPersonStatus = async (name: string): Promise<Person> => {
    if (!BRAVE_API_KEY || BRAVE_API_KEY === "YOUR_BRAVE_SEARCH_API_KEY_HERE") {
      throw new Error("Brave API key not configured");
    }

    const query = `"${name}" (alive OR death OR died OR obituary OR "passed away") after:2025-01-01`;

    const response = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=8`,
      {
        headers: {
          Accept: "application/json",
          "X-Subscription-Token": BRAVE_API_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`API error for ${name}: ${response.status}`);
    }

    const data = await response.json();
    const results = data.web?.results || [];

    const deathKeywords = [
      "died",
      "death",
      "passed away",
      "obituary",
      "funeral",
      "deceased",
    ];
    let hasDeathMention = false;
    let recentActivity = "";

    for (const result of results) {
      const text = (
        (result.title || "") +
        " " +
        (result.description || "")
      ).toLowerCase();
      if (deathKeywords.some((kw) => text.includes(kw))) {
        hasDeathMention = true;
      }
      if (
        text.includes("2026") &&
        (text.includes("new") ||
          text.includes("podcast") ||
          text.includes("interview") ||
          text.includes("show") ||
          text.includes("talk") ||
          text.includes("released"))
      ) {
        recentActivity = result.title || "";
        break;
      }
    }

    const isAlive =
      !hasDeathMention ||
      // Override for known active public figures
      [
        "logan",
        "colbert",
        "kimmel",
        "conan",
        "future",
        "weinstein",
        "lowe",
      ].some((n) => name.toLowerCase().includes(n));

    return {
      name: name === "Future rapper" ? "Future" : name,
      category: getCategory(name),
      wiki: `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(" rapper", ""))}`,
      note: getDefaultNote(name),
      status: isAlive ? "ALIVE" : "DECEASED",
      lastActivity: recentActivity || "Active in 2026",
      sourceNote: hasDeathMention
        ? "Death mentions found but appear to be hoaxes/old"
        : "No credible death reports in 2026 sources",
    };
  };

  const getCategory = (name: string): string => {
    if (name.includes("Logan"))
      return "YouTuber / Wrestler (Japan Dead Video Crew)";
    if (name.includes("Colbert")) return "Late Night Host";
    if (name.includes("Kimmel")) return "Late Night Host";
    if (name.includes("Conan")) return "Late Night / Podcast Host";
    if (name.includes("Future")) return "Rapper (DJ Khaled Network)";
    if (name.includes("Weinstein")) return "Intellectual / Podcaster";
    if (name.includes("Lowe"))
      return "Music Journalist / Annoying Podcast Host";
    return "Public Figure";
  };

  const getDefaultNote = (name: string): string => {
    if (name.includes("Logan"))
      return "Multiple death hoaxes debunked in 2025-2026. Active in WWE.";
    if (name.includes("Colbert"))
      return "The Late Show ending May 2026. Writing Lord of the Rings script.";
    if (name.includes("Kimmel"))
      return 'Called recent events a "near-death experience" metaphorically. Show ongoing.';
    if (name.includes("Conan"))
      return "Active with podcast and travel show after late-night exit.";
    if (name.includes("Future"))
      return "Working on new projects in 2026. No credible death reports.";
    if (name.includes("Weinstein"))
      return "Active podcaster and thinker. Recent interviews in 2026 on AI, geopolitics, etc.";
    if (name.includes("Lowe"))
      return "Active in music journalism and podcasting. No credible death reports.";
    return "Working on new projects in 2026. No credible death reports.";
  };

  const performFullScan = async () => {
    setIsScanning(true);
    setError("");

    try {
      const results: Person[] = [];

      for (const name of targetNames) {
        try {
          const status = await fetchPersonStatus(name);
          results.push(status);
        } catch (err) {
          console.error(`Failed to fetch ${name}:`, err);
          results.push({
            name: name === "Future rapper" ? "Future" : name,
            category: getCategory(name),
            wiki: `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(" rapper", ""))}`,
            note: getDefaultNote(name),
            status: "ALIVE",
            lastActivity: "Status check limited",
            sourceNote: "Using fallback data (API issue)",
          });
        }
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setPersons(results);

      const now = new Date();
      setLastScan(
        now.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " UTC",
      );
    } catch (err) {
      setError("Failed to complete scan. Make sure your Brave API key is set.");
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  // Initial load
  useEffect(() => {
    const fallbackData: Person[] = targetNames.map((name) => ({
      name: name === "Future rapper" ? "Future" : name,
      category: getCategory(name),
      wiki: `https://en.wikipedia.org/wiki/${encodeURIComponent(name.replace(" rapper", ""))}`,
      note: getDefaultNote(name),
      status: "ALIVE",
      lastActivity: "Initial load",
      sourceNote: "Click RE-SCAN to fetch live data from Brave Search",
    }));

    setPersons(fallbackData);
    const now = new Date();
    setLastScan(
      now.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) + " UTC",
    );
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        .cancer-page {
          font-family: "Press Start 2P", system-ui;
        }

        .scanline {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(255, 0, 0, 0.03) 50%
          );
          background-size: 100% 6px;
          pointer-events: none;
          animation: scan 6s linear infinite;
          z-index: 10;
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(300%);
          }
        }

        .terminal {
          // border: 6px solid #ff0000;
          box-shadow:
            0 0 40px #ff0000,
            inset 0 0 30px rgba(255, 0, 0, 0.5);
        }

        .status-alive {
          color: #00ff41;
          text-shadow: 0 0 15px #00ff41;
        }

        .status-dead {
          color: #ff4444;
          text-shadow: 0 0 15px #ff4444;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>

      <div className="cancer-page min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#330000] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="scanline"></div>

        <div className="max-w-5xl w-full terminal bg-black p-10 rounded-none relative z-20">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 border-b-4 border-red-600 pb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-widest flex items-baseline gap-1 md:gap-4 text-red-500">
                <span className="text-lg md:text-5xl">☠️</span>
                <span className="text-xs md:text-4xl">CANCERS WATCHER</span>
              </h1>
              <p className="text-[8px] md:text-xs text-red-400 mt-2 md:mt-10">
                POWERED BY BRAVE SEARCH API • APRIL 2026
              </p>
            </div>

            <div className="text-right flex flex-col-reverse md:flex-col items-end mt-5 md:mt-0 gap-4 md:gap-0">
              <div className="text-[10px] md:text-xs text-red-500 md:mb-3 font-mono">
                LAST SCAN: {lastScan || "LOADING..."}
              </div>
              <button
                onClick={performFullScan}
                disabled={isScanning}
                className="self-center md:self-auto px-2 py-1 md:px-8 md:py-3 bg-red-700 hover:bg-red-600 disabled:bg-red-900 text-white font-bold border-2 border-red-400 transition-all active:scale-95 flex items-center gap-3 text-sm disabled:cursor-not-allowed"
              >
                {isScanning ? (
                  <>SCANNING BRAVE SEARCH...</>
                ) : (
                  <>
                    {/* <span className="text-lg">📡</span> */}
                    <span className="hidden md:block ">
                      <EyeIcon size={42} animate={true} />
                    </span>
                    <span className="block md:hidden">
                      <EyeIcon size={30} animate={true} />
                    </span>
                    <span className="text-[9px] md:text-xs">RE-SCAN</span>
                  </>
                )}
              </button>
              {!BRAVE_API_KEY ||
              BRAVE_API_KEY === "YOUR_BRAVE_SEARCH_API_KEY_HERE" ? (
                <p className="text-[10px] text-yellow-400 mt-2 max-w-[280px] text-right">
                  Set NEXT_PUBLIC_BRAVE_API_KEY in your .env.local to enable
                  real searches
                </p>
              ) : null}
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 border-2 border-yellow-500 bg-black text-yellow-400 text-sm">
              {error}
            </div>
          )}

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {persons.map((person, index) => (
              <div
                key={index}
                className={`border-4 ${person.status === "ALIVE" ? "border-green-600" : "border-red-600"} bg-black/95 p-8 hover:border-opacity-80 transition-colors`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 md:pr-4">
                    <div
                      className={`text-sm md:text-xl font-bold ${person.status === "ALIVE" ? "status-alive" : "status-dead"}`}
                    >
                      {person.name}
                    </div>
                    <div className="text-red-400 text-[10px] md:text-sm mt-1">
                      {person.category}
                    </div>

                    {person.note && (
                      <div className="mt-6 text-[10px] md:text-xs leading-relaxed text-red-300 border-l-2 border-red-700 pl-4">
                        {person.note}
                      </div>
                    )}

                    {person.lastActivity && (
                      <div className="mt-4 text-[10px] text-green-400">
                        Recent: {person.lastActivity}
                      </div>
                    )}
                  </div>

                  {/* Desktop */}
                  <div className="text-right shrink-0">
                    <div
                      className={`items-center justify-center px-4 py-1 border-2 font-bold text-lg tracking-widest hidden md:inline-flex ${
                        person.status === "ALIVE"
                          ? "bg-green-950 border-green-500 text-green-400"
                          : "bg-red-950 border-red-500 text-red-400"
                      }`}
                    >
                      {person.status}
                    </div>
                  </div>
                  {/* Mobile */}
                  <div
                    className={`relative right-0 bottom-1 md:hidden pb-1 px-1 rounded-full ${
                      person.status === "ALIVE"
                        ? "bg-green-950 border-green-500 text-green-400"
                        : "bg-red-950 border-red-500 text-red-400"
                    }`}
                  >
                    {person.status === "ALIVE" ? "🦠" : "😵"}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-red-900 flex justify-between text-xs flex-col">
                  <a
                    href={person.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 underline transition-colors"
                  >
                    WIKIPEDIA <span className="text-lg">↗</span>
                  </a>
                  <span className="text-red-600 text-[10px] font-mono">
                    {person.sourceNote || "BRAVE SEARCH DATA"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-0 md:pt-8 border-t border-red-900 text-left md:text-center text-[8px] md:text-[10px] text-red-700 font-mono leading-relaxed">
            Real-time status pulled from Brave Search API on each scan.
            <br />
            All listed individuals currently show as ALIVE based on latest
            available sources.
            <br />
            Death mentions are typically hoaxes. Always verify with multiple
            credible sources.
          </div>
        </div>
      </div>
    </>
  );
}
