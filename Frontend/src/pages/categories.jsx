import React, { useEffect, useState, useMemo } from "react";

// Utility for unique categories
function getCategories(tools) {
  return ["All Categories", ...Array.from(new Set(tools.map(t => t.category || "Other")))];
}

export default function ToolsExplorer() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("Trending");
  const [visibleCount, setVisibleCount] = useState(20);


  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => {
        setTools(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load tools data.");
        setLoading(false);
      });
  }, []);

  // Reset visibleCount when filters/search change
  useEffect(() => {
    setVisibleCount(20);
  }, [search, category, sort, tools]);

  // Categories for dropdown
  const categories = useMemo(() => getCategories(tools), [tools]);

  // Filtered and sorted tools
  const filtered = useMemo(() => {
    let result = tools;
    if (category !== "All Categories") {
      result = result.filter(t => (t.category || "Other") === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(t =>
        (t.name || "").toLowerCase().includes(q) ||
        (t.tagline || "").toLowerCase().includes(q) ||
        (t.category || "").toLowerCase().includes(q)
      );
    }
    // Sorting (Trending, Top Rated, etc. - only Trending implemented)
    if (sort === "Top Rated") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "Most Reviewed") {
      result = [...result].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return result;
  }, [tools, search, category, sort]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-[95%] mx-auto">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2 flex-1">
            <input
              type="search"
              className="px-4 py-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full md:w-64"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-700 cursor-pointer"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <select
              className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-700 cursor-pointer"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="Trending">Trending</option>
              <option value="Top Rated">Top Rated</option>
              <option value="Most Reviewed">Most Reviewed</option>
            </select>
            <button
              className="px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-700 flex items-center gap-1"
              disabled
            >
              <span>Filters</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-.293.707l-6.414 6.414A1 1 0 0 0 14 13.414V19a1 1 0 0 1-1.447.894l-4-2A1 1 0 0 1 8 17v-3.586a1 1 0 0 0-.293-.707L1.293 6.707A1 1 0 0 1 1 6V4z"/></svg>
            </button>
            <button className="p-2 rounded-md border border-gray-200 bg-white text-gray-700" title="Grid view">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            </button>
            <button className="p-2 rounded-md border border-gray-200 bg-white text-gray-700" title="List view">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="7" height="7" rx="1"/><rect x="14" y="5" width="7" height="7" rx="1"/><rect x="3" y="14" width="18" height="5" rx="1"/></svg>
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-gray-600 text-sm">
          Showing <span className="font-semibold">{filtered.length}</span> results
        </div>

        {/* Tool Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading tools…</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No tools found.</div>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
              {filtered.slice(0, visibleCount).map((t) => (
                <article
                  key={t.id}
                  className="bg-white rounded-xl border h-75 border-gray-200 shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3 ">
                    <img
                      src={
                        t.thumbnail ||
                        `https://api.dicebear.com/6.x/thumbs/svg?seed=${encodeURIComponent(t.name)}`
                      }
                      alt={t.name}
                      className="h-12 w-12 rounded-md object-cover flex-none"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-semibold text-base text-gray-900 truncate">{t.name}</span>
                        {/* {t.sponsored && (
                          <span className="ml-1 text-xs bg-pink-100 text-pink-600 px-1.5 py-0.5 rounded-full">🎯</span>
                        )} */}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17.75L18.16 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.48 4.73L5.82 21z"/></svg> {t.rating || 0}</div>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{t.tagline}</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{t.category || "Other"}</span>
                        {/* Example tag, replace with real tags if available */}
                        <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">free</span>
                      </div>
                    </div>
                  </div>
                  {/* Stats row (mocked, as tools.json does not have these fields) */}
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1"><svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg> {t.reviews || 0}</div>
                    <div className="flex items-center gap-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg> 0</div>
                  </div>
                </article>
              ))}
            </section>
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-8">
                <button
                  className="w-[100%] cursor-pointer py-3 rounded-lg bg-purple-50 text-purple-600 font-medium hover:bg-purple-100 transition"
                  onClick={() => setVisibleCount((c) => c + 10)}
                >
                  Load More Tools
                  <span className="ml-2 align-middle inline-block">
                    {/* Thin down chevron arrow */}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
