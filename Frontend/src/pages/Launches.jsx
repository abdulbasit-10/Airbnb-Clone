import React, { useState, useEffect } from "react";
import Footer from "../components/footer";

export default function Launches() {
  const [tab, setTab] = useState("latest");
  const [tools, setTools] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);

  // Dummy logic: latest = id <= 30, upcoming = id > 30
  const filtered = tab === "latest"
    ? tools.filter((tool) => tool.id <= 30)
    : tools.filter((tool) => tool.id > 30);

  // Reset visibleCount when tab changes
  useEffect(() => {
    setVisibleCount(6);
  }, [tab]);

  const visibleTools = filtered.slice(0, visibleCount);
  const canLoadMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto py-10 flex-1">
      <h1 className="text-2xl font-bold mb-6 text-center">Launches</h1>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-md font-semibold border ${tab === "latest" ? "bg-green-500 text-white" : "bg-white text-green-600"}`}
          onClick={() => setTab("latest")}
        >
          Latest Launches
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold border ${tab === "upcoming" ? "bg-green-500 text-white" : "bg-white text-green-600"}`}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleTools.length === 0 ? (
          <div className="col-span-3 text-center text-gray-400">No tools found.</div>
        ) : (
          visibleTools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
              <img src={tool.thumbnail} alt={tool.name} className="h-16 w-16 mb-2 rounded-full object-cover" />
              <div className="font-bold text-lg mb-1">{tool.name}</div>
              <div className="text-sm text-gray-500 mb-2">{tool.tagline}</div>
              <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium hover:underline">Visit</a>
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
