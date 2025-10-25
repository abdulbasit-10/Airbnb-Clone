// src/pages/Launches.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/footer";

export default function Launches() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tab, setTab] = useState("latest");
  const [tools, setTools] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true); // <-- NEW

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:3000/api/gemini/latest")
      .then((res) => {
        console.log(res)
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ tools.json loaded:", data);
        setTools(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("❌ Failed to load tools.json:", err);
        setTools([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // update tab when URL changes
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    const next = parts[1] === "upcoming" ? "upcoming" : "latest";
    if (next !== tab) setTab(next);
    setVisibleCount(6);
  }, [location.pathname]);

  // default redirect to /launches/latest
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 1) navigate("/launches/latest", { replace: true });
  }, [location.pathname, navigate]);

  const goToTab = (t) => {
    const path = t === "latest" ? "/launches/latest" : "/launches/upcoming";
    navigate(path);
    setTab(t);
    setVisibleCount(6);
  };

  const filtered = tools.filter((t) => t.status === tab);
  const visibleTools = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-6xl mx-auto w-full px-4 py-30 flex-1">
        {/* ======== Header Section ======== */}
        {tab === "latest" ? (
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-2">
              <span className="text-purple-500 text-3xl">⚡</span>
            </div>
            <h1 className="text-4xl font-bold text-purple-700 mb-2">
              Latest AI Tool Launches
            </h1>
            <p className="text-gray-600">
              Discover the newest AI tools and innovations. Be among the first
              to explore and try out these cutting-edge solutions.
            </p>
          </div>
        ) : (
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-2">
              <span className="text-purple-500 text-3xl">⭐</span>
            </div>
            <h1 className="text-4xl font-bold text-purple-700 mb-2">
              Upcoming AI Tools
            </h1>
            <p className="text-gray-600">
              Get a sneak peek at the most anticipated AI tools launching soon.
              Subscribe to be notified when they go live.
            </p>
          </div>
        )}

        {/* ======== Tabs ======== */}
        <div className="flex justify-center gap-3 mb-10">
          {/* <button
            onClick={() => goToTab("latest")}
            className={`px-4 py-2 rounded-full font-semibold border ${
              tab === "latest"
                ? "bg-green-500 text-white"
                : "bg-white text-green-600 border-green-500"
            }`}
          >
            Latest
          </button> */}
          {/* <button
            onClick={() => goToTab("upcoming")}
            className={`px-4 py-2 rounded-full font-semibold border ${
              tab === "upcoming"
                ? "bg-green-500 text-white"
                : "bg-white text-green-600 border-green-500"
            }`}
          >
            Upcoming
          </button> */}
        </div>

        {/* ======== Loading or Empty States ======== */}
        {loading ? (
          <div className="text-center text-gray-500">Loading tools...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-400">No tools found.</div>
        ) : null}

        {/* ======== Latest Tools Grid ======== */}
        {!loading && tab === "latest" && filtered.length > 0 && (
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

                    <div className="font-semibold text-gray-800 truncate mb-1">
                      {tool.name}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                      {tool.description}
                    </p>
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

            {/* Load More Button */}
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

        {/* ======== Upcoming Tools List ======== */}
        {!loading && tab === "upcoming" && filtered.length > 0 && (
          <div className="space-y-6">
            {visibleTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-200"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {tool.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    {tool.description}
                  </p>
                  <div className="text-sm text-gray-500">{tool.category}</div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-semibold">
                    Coming Soon
                  </span>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-semibold shadow hover:bg-green-600">
                    Get Notified
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
