import React, { useState } from "react";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "product", label: "Product Update" },
  { key: "dev", label: "AI Development" },
  { key: "research", label: "Research" },
  { key: "policy", label: "Policy" },
];

const NEWS = [
  {
    id: 1,
    title: "AI Regulation: EU Passes Landmark AI Act",
    summary: "European Union approves comprehensive AI regulations, setting global standards for AI development and deployment.",
    date: "5/12/2025",
    views: 5000556,
    tag: "Trending",
    author: "Anna Schmidt",
    filter: "policy",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Microsoft Integrates Advanced AI Features Across Office Suite",
    summary: "New AI-powered features in Microsoft 365 promise to revolutionize productivity and collaboration.",
    date: "5/12/2025",
    views: 5480,
    tag: "Trending",
    author: "Gurdit Kumar",
    filter: "product",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Meta's AI Translation Model Breaks Language Barriers",
    summary: "Meta's new AI system can translate between 200 languages, making communication more accessible worldwide.",
    date: "5/12/2025",
    views: 487,
    tag: "AI Development",
    author: "Lisa Wang",
    filter: "dev",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "OpenAI Announces GPT-5 Development Plans",
    summary: "The company shared ambitious plans for the next generation of AI models, promising breakthrough capabilities.",
    date: "5/12/2025",
    views: 1143,
    tag: "AI Development",
    author: "Sarah Chan",
    filter: "dev",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Google's DeepMind Achieves Breakthrough in Protein Folding",
    summary: "New AI model predicts protein structures with remarkable accuracy, paving the way for medical advances.",
    date: "5/12/2025",
    views: 950245,
    tag: "Research",
    author: "Michael Rodriguez",
    filter: "research",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  }
];

export default function News() {
  const [filter, setFilter] = useState("all");
  const filteredNews = filter === "all" ? NEWS : NEWS.filter(n => n.filter === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center pt-12 pb-6">
        {/* Heading first */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-purple-700 mb-2">Latest AI News & Updates</h1>
        {/* SVG icon below heading */}
        <div className="flex justify-center mb-2">
          <div className="bg-purple-100 rounded-full p-2 inline-flex">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#a78bfa" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
        </div>
        <p className="text-gray-500 max-w-xl mx-auto">Stay informed with the latest breakthroughs, updates, and developments in the world of artificial intelligence.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`px-4 py-1 rounded-full border font-medium text-sm transition ${filter === f.key ? "bg-green-500 text-white" : "bg-white text-gray-700 border-gray-200 hover:bg-green-50"}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-4">
        {filteredNews.map((n, i) => (
          <div key={n.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
            <div className="relative h-44 w-full overflow-hidden">
              <img src={n.image} alt={n.title} className="object-cover w-full h-full" />
              <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">{n.tag}</div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                <span>🗓 {n.date}</span>
                <span>👁 {n.views.toLocaleString()} views</span>
              </div>
              <div className="font-bold text-lg text-gray-900 mb-1">{n.title}</div>
              <div className="text-gray-500 text-sm mb-3 flex-1">{n.summary}</div>
              <div className="flex items-center gap-2 mt-auto">
                <span className="text-xs text-gray-500">{n.author}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{FILTERS.find(f => f.key === n.filter)?.label || n.filter}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
