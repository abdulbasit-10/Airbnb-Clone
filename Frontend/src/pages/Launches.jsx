// src/pages/Launches.jsx
import React, { useState, useEffect } from "react";
import Footer from "../components/footer";

export default function Launches() {
  const [tools, setTools] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const ENDPOINT = `${API_BASE}/api/gemini/latest`; // ✅ Always load from your main endpoint

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTools([]);
    setVisibleCount(6);

    console.info("➡ Fetching tools from:", ENDPOINT);

    fetch(ENDPOINT)
      .then(async (res) => {
        console.info("⤴ Response status:", res.status, res.statusText);
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} - ${txt}`);
        }

        const data = await res.json().catch((e) => {
          throw new Error("Invalid JSON: " + e.message);
        });

        console.log("✅ Raw JSON:", data);

        // Identify array
        let arr = null;
        if (Array.isArray(data)) arr = data;
        else if (Array.isArray(data.data)) arr = data.data;
        else if (Array.isArray(data.tools)) arr = data.tools;
        else if (Array.isArray(data.result)) arr = data.result;
        else if (Array.isArray(data.items)) arr = data.items;

        if (!arr && data && typeof data === "object") {
          const firstArrayProp = Object.keys(data).find((k) => Array.isArray(data[k]));
          if (firstArrayProp) arr = data[firstArrayProp];
        }

        if (!arr) {
          console.warn("⚠ No array found, saving full object as single item.");
          setTools([data]);
          setLoading(false);
          return;
        }

        // Normalize items
        const normalized = arr.map((it, idx) => ({
          id: it.id ?? it._id ?? `${Date.now()}-${idx}`,
          name: it.name ?? it.title ?? "Untitled",
          description: it.description ?? it.desc ?? "",
          url: it.url ?? it.link ?? "#",
          pricing: it.pricing ?? null,
          views: it.views ?? it.viewCount ?? 0,
          category: it.category ?? it.cat ?? "",
        }));

        setTools(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch failed:", err);
        setError(err.message || "Failed to fetch tools");
        setLoading(false);
      });
  }, [ENDPOINT]);

  const visibleTools = tools.slice(0, visibleCount);
  const canLoadMore = visibleCount < tools.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-6xl mx-auto w-full px-4 py-30 flex-1">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <span className="text-purple-500 text-3xl">⚡</span>
          </div>
          <h1 className="text-4xl font-bold text-purple-700 mb-2">Latest AI Tools</h1>
          <p className="text-gray-600">
            Discover the most recent AI tools and innovations from across the web.
          </p>
        </div>

        {/* Error / Loading / Empty States */}
        {loading && <div className="text-center text-gray-500">Loading tools...</div>}
        {!loading && error && <div className="text-center text-red-500">Error: {error}</div>}
        {!loading && !error && tools.length === 0 && (
          <div className="text-center text-gray-400">No tools found.</div>
        )}

        {/* Tools Grid */}
        {!loading && !error && tools.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {visibleTools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg p-5 flex flex-col justify-between transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
                        New
                      </span>
                      {tool.pricing && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {tool.pricing}
                        </span>
                      )}
                    </div>
                    <div className="font-semibold text-gray-800 truncate mb-1">{tool.name}</div>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">{tool.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                      <span>👁</span>
                      <span>{tool.views || 0}</span>
                    </div>
                    <a
                      href={tool.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {canLoadMore && (
              <div className="flex justify-center mt-10">
                <button
                  className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold shadow hover:bg-green-600"
                  onClick={() => setVisibleCount((c) => c + 6)}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}