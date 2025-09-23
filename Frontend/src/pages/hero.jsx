import React, { useRef } from "react";

/**
 * HomeHero - Hero section with center title, subtitle, search and decorative logos.
 *
 * Usage:
 *  - Place images used below in public/logos/ (or update src paths).
 *  - Import and use in your App: <HomeHero />
 */

const LOGOS = [
  { src: "/logos/google.png", top: "16%", left: "7%", size: 10 },
  { src: "/logos/microsoft.png", top: "19%", left: "28%", size: 10 },
  { src: "/logos/github.png", top: "38%", left: "8%", size: 10 },
  { src: "/logos/linkedin.png", bottom: "7%", left: "13%", size: 10 },
  { src: "/logos/slack.png", top: "17%", right: "7%", size: 10 },
  { src: "/logos/discord.png", top: "38%", right: "13%", size: 10 },
  { src: "/logos/notion.png", bottom: "18%", right: "8%", size: 10 },
  { src: "/logos/openai.png", bottom: "7%", right: "28%", size: 10 },
];

export default function HomeHero() {
  const searchRef = useRef(null);

  // optional: press "/" or "k" to focus search (nice UX)
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" || e.key === "k") {
        const el = searchRef.current;
        if (el && document.activeElement !== el) {
          e.preventDefault();
          el.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-green-50  to-indigo-50/60">
      {/* Decorative floating logos */}
      <div className="pointer-events-none absolute inset-0">
        {LOGOS.map((l, i) => {
          const style = {
            top: l.top,
            left: l.left,
            right: l.right,
            bottom: l.bottom,
            transform: "translate(-50%, -50%)",
          };
          // For edges, remove translate adjustment
          if (l.left === undefined && l.right !== undefined) style.transform = "translateY(-50%)";
          if (l.top === undefined && l.bottom !== undefined) style.transform = "translateX(-50%)";
          return (
            <div
              key={i}
              style={style}
              className="absolute rounded-xl bg-white/80 shadow-md p-2 flex items-center justify-center"
            >
              <img
                src={l.src}
                alt=""
                className={`block ${l.size ? `w-${l.size}` : "w-10"} h-${l.size ?? 10} object-contain`}
                style={{ width: `${l.size * 3}px`, height: `${l.size * 3}px` }}
                loading="lazy"
                aria-hidden
              />
            </div>
          );
        })}
      </div>

      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* top badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white/90 border border-green-100 shadow-sm rounded-full px-4 py-1 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-green-600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2L15 9H22L17 13L19 20L12 16L5 20L7 13L2 9H9L12 2Z" fill="currentColor" />
            </svg>
            <span className="text-xs text-gray-700">12,131 AI Tools Available</span>
          </div>
        </div>

        {/* headline */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-slate-900">
            Every piece of AI 
            <br />
            <span className="text-green-500">worth knowing</span>
            <br />
            <span className="block">— one click away</span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-base sm:text-lg">
            Discover the best AI tools for your needs
          </p>
        </div>

        {/* search bar */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-3xl">
            <div className="flex items-center gap-3 bg-white/90 border border-gray-200 rounded-full px-4 py-3 shadow-sm">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
              </svg>

              <input
                ref={searchRef}
                type="search"
                placeholder="Search for any tool..."
                className="flex-1 text-sm sm:text-base outline-none bg-transparent"
                aria-label="Search tools"
              />

              <div className="ml-3 flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-xs text-gray-600">
                  ⌘ K
                </span>
                <button
                  className="ml-1 inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
                  aria-label="Search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


