// src/pages/Launches.jsx
import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { useNavigate, useLocation } from "react-router-dom";

export default function Launches() {
  const navigate = useNavigate();
  const location = useLocation();

  // derive tab from URL: '/launches/latest' or '/launches/upcoming'
  // default to 'latest'
  const pathParts = location.pathname.split("/").filter(Boolean); // e.g. ['launches','latest']
  const urlTab = pathParts[1] || "latest";

  const [tab, setTab] = useState(urlTab);
  const [tools, setTools] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(Array.isArray(data) ? data : []))
      .catch(() => setTools([]));
  }, []);

  // keep tab state in sync with URL changes (back/forward)
  useEffect(() => {
    if (urlTab !== tab) setTab(urlTab);
    // reset visible count when tab changes
    setVisibleCount(6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTab]);

  // If user visits '/launches' exactly, redirect to '/launches/latest'
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 1) {
      navigate("/launches/latest", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dummy logic: latest = id <= 30, upcoming = id > 30
  const filtered = tab === "latest"
    ? tools.filter((tool) => Number(tool.id) <= 30)
    : tools.filter((tool) => Number(tool.id) > 30);

  const visibleTools = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  // change tab and push to URL
  const goToTab = (t) => {
    const path = t === "latest" ? "/launches/latest" : "/launches/upcoming";
    // update history + URL
    navigate(path);
    // setTab will be updated from location -> useEffect above, but set immediately for snappy UI
    setTab(t);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto py-30 flex-1">
        <h1 className="text-2xl font-bold mb-6 text-center">Launches</h1>

        {/* <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-md font-semibold border ${tab === "latest" ? "bg-green-500 text-white" : "bg-white text-green-600"}`}
            onClick={() => goToTab("latest")}
          >
            Latest Launches
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold border ${tab === "upcoming" ? "bg-green-500 text-white" : "bg-white text-green-600"}`}
            onClick={() => goToTab("upcoming")}
          >
            Upcoming
          </button>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleTools.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">No tools found.</div>
          ) : (
            visibleTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <img
                  src={tool.thumbnail || "/logo.svg"}
                  alt={tool.name}
                  className="h-16 w-16 mb-2 rounded-full object-cover"
                />
                <div className="font-bold text-lg mb-1 text-center">{tool.name}</div>
                <div className="text-sm text-gray-500 mb-2 text-center">{tool.tagline}</div>
                <a
                  href={tool.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-medium hover:underline"
                >
                  Visit
                </a>
              </div>
            ))
          )}
        </div>

        {canLoadMore && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold shadow hover:bg-green-600"
              onClick={() => setVisibleCount((c) => c + 6)}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
