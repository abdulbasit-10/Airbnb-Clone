// src/pages/blogs.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import BlogsImage from "../assets/Blogs.jpg"; // imported so bundler resolves it
// Dummy blog data
const blogs = [
  {
    id: 1,
    title: "Optimizing Machine Learning Models for Production",
    date: "5/12/2025",
    read: "15 min read",
    desc: "Learn essential techniques for optimizing and deploying machine learning models in production environments.",
    author: { name: "David Kumar", initials: "DK" },
    tags: ["MLOps", "Performance", "DevOps", "+1"],
    category: "MLOps",
    image: BlogsImage,
  },
  {
    id: 2,
    title: "Edge AI: Computing at the Frontier",
    date: "5/12/2025",
    read: "9 min read",
    desc: "Learn about the latest developments in Edge AI and how it's enabling real-time processing and decision-making.",
    author: { name: "James Wilson", initials: "JW" },
    tags: ["Edge Computing", "AI", "IoT"],
    category: "Edge Computing",
    image: BlogsImage,
  },
  {
    id: 3,
    title: "AI Project Management Best Practices",
    date: "5/12/2025",
    read: "14 min read",
    desc: "Master the art of managing AI projects with these proven best practices and methodologies for success.",
    author: { name: "Rachel Adams", initials: "RA" },
    tags: ["Project Management", "AI", "Best Practices"],
    category: "Project Management",
    image: BlogsImage,
  },
  {
    id: 4,
    title: "Natural Language Processing Trends in 2025",
    date: "5/12/2025",
    read: "12 min read",
    desc: "Explore the latest NLP trends and how they're shaping the future of AI-powered communication.",
    author: { name: "Sara Lee", initials: "SL" },
    tags: ["NLP", "AI", "Trends"],
    category: "NLP",
    image: BlogsImage,
  },
  {
    id: 5,
    title: "Responsible AI: Ethics and Governance",
    date: "5/12/2025",
    read: "11 min read",
    desc: "Understand the importance of ethics and governance in AI development and deployment.",
    author: { name: "Mohsin Ali", initials: "MA" },
    tags: ["Ethics", "Governance", "AI"],
    category: "Ethics",
    image: BlogsImage,
  },
  {
    id: 6,
    title: "AI for Healthcare: Opportunities & Challenges",
    date: "5/12/2025",
    read: "10 min read",
    desc: "Discover how AI is transforming healthcare and what challenges remain.",
    author: { name: "Ayesha Khan", initials: "AK" },
    tags: ["Healthcare", "AI", "Innovation"],
    category: "Healthcare",
    image: BlogsImage,
  },
  {
    id: 7,
    title: "Computer Vision: Beyond Image Recognition",
    date: "5/12/2025",
    read: "13 min read",
    desc: "Dive into advanced computer vision applications beyond basic image recognition.",
    author: { name: "Bilal Shah", initials: "BS" },
    tags: ["Computer Vision", "AI", "Deep Learning"],
    category: "Computer Vision",
    image: BlogsImage,
  },
  {
    id: 8,
    title: "AI in Finance: Risk, Reward, and Regulation",
    date: "5/12/2025",
    read: "8 min read",
    desc: "How AI is changing the finance sector, from risk management to regulatory compliance.",
    author: { name: "Fatima Noor", initials: "FN" },
    tags: ["Finance", "AI", "Regulation"],
    category: "Finance",
    image: BlogsImage,
  },
  {
    id: 9,
    title: "Building Scalable AI Infrastructure",
    date: "5/12/2025",
    read: "16 min read",
    desc: "Best practices for designing and maintaining scalable AI infrastructure.",
    author: { name: "Usman Tariq", initials: "UT" },
    tags: ["Infrastructure", "AI", "Cloud"],
    category: "Infrastructure",
    image: BlogsImage,
  },
];

export default function Blogs() {
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q) ||
        b.author.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-purple-600 mb-15 text-center">
            AI Insights &amp; Guides
          </h1>
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-3">
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M13 3v8.267a2 2 0 0 0 1.106 1.789l6.788 3.394A2 2 0 0 1 20 19.267V21M13 3a2 2 0 0 0-2 2v6.267a2 2 0 0 1-1.106 1.789l-6.788 3.394A2 2 0 0 0 4 19.267V21m9-18a2 2 0 0 0-2-2m2 2a2 2 0 0 1 2 2v6.267a2 2 0 0 0 1.106 1.789l6.788 3.394A2 2 0 0 1 20 19.267V21m-8-18a2 2 0 0 1 2-2" />
            </svg>
          </div>
          <p className="text-gray-500 text-center max-w-2xl mb-6">
            Deep dives into AI technology, tutorials, best practices, and expert insights to help you make the most of AI tools.
          </p>
          <input
            type="search"
            className="px-4 py-2 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 w-full max-w-xl"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Blog Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-10">No articles found.</div>
          ) : (
            filteredBlogs.map((b) => (
              <Link
                to={`/blogs/${b.id}`}
                key={b.id}
                className="block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <article>
                  <img src={b.image} alt={b.title} className="w-full h-40 object-cover rounded-t-xl" />
                  <div className="p-4">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z" />
                        </svg>
                        {b.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {b.read}
                      </span>
                    </div>
                    <h2 className="font-semibold text-lg text-gray-900 mb-1">{b.title}</h2>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{b.desc}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600">{b.author.initials}</span>
                      <span className="text-xs text-gray-700">{b.author.name}</span>
                      <span className="ml-auto text-xs text-purple-600">{b.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {b.tags.map((tag, i) => (
                        <span key={i} className="bg-purple-50 text-purple-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
