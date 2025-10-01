  // src/components/Navbar.jsx
  import React, { useState, useEffect, useRef } from "react";
  import DropdownMenu from "./DropdownMenu";
  // import { Link } from "react-router-dom";


  const MENU = [
    { key: "Launches", label: "Launches", items: ["Latest Launches", "Upcoming"] },
    { key: "products", label: "Products", items: ["Top Products", "Categories", "Trending"] },
    { key: "news", label: "News", items: ["Latest News", "Blogs"] },
    {key: "Advertise", label: "Advertise"},
  ];

  export default function Navbar({setView}) { 
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // for desktop
    const [mobileAccordion, setMobileAccordion] = useState(null); // for mobile submenus
    const navRef = useRef();

    // close dropdowns on outside click
    useEffect(() => {
      function handleClick(e) {
        if (!navRef.current) return;
        if (!navRef.current.contains(e.target)) {
          setOpenDropdown(null);
          // keep mobileOpen as user might want to click outside to close too
          setMobileOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // simple keyboard escape to close
    useEffect(() => {
      function onKey(e) {
        if (e.key === "Escape") {
          setOpenDropdown(null);
          setMobileOpen(false);
        }
      }
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, []);

    return (
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center from-green-50">
        <div className="w-[95%] bg-white py-3 rounded-2xl mt-4 mb-0 border border-gray-100 shadow flex flex-col">
    <div ref={navRef} className="w-full px-4 md:px-6 lg:pl-8">
    <div className="flex items-center justify-between w-full gap-4 h-16">
            {/* Left: Logo */}
            <div
              onClick={() => setView("home")}
              className="flex items-center cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              <img src="/logo.svg" alt="Logo" className="w-40 h-10 rounded-full object-cover mr-2" />
              <span className="text-3xl font-semibold whitespace-nowrap">AI Tool Finder</span>
            </div>
            
            {/* Desktop nav pills */}
            <nav className="hidden md:flex items-center gap-5">
              {MENU.filter(m => m.key !== "Advertise").map((m) => (
                <div
                  key={m.key}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(m.key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-2 py-2 text-gray-600 font-medium focus:outline-none ${openDropdown === m.key ? "text-green-600" : ""}`}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === m.key}
                    tabIndex={0}
                  >
                    {m.label}
                    <svg className={`h-4 w-4 ml-1 transition-transform ${openDropdown === m.key ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {openDropdown === m.key && m.items && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-0 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-40 animate-fade-in p-4">
                      {m.key === "Launches" ? (
                        <>
                          <button
                            onClick={() => setView("launches")}
                            className="block w-full text-left mb-4"
                          >
                            <div className="font-semibold text-gray-900 text-base">Latest Launches</div>
                            <div className="text-sm text-gray-500">New AI tools this week</div>
                          </button>
                          <button
                            onClick={() => setView("launches")}
                            className="block w-full text-left"
                          >
                            <div className="font-semibold text-gray-900 text-base">Upcoming</div>
                            <div className="text-sm text-gray-400">Soon to be launched</div>
                          </button>
                        </>
                      ) : (
                        <div className="p-2">
                          {m.items.map((it) => (
                            <button
                              key={it}
                              onClick={() => {
                                  if ( it === "Latest News") {
                                    setView("news");
                                  } else if (it === "Blogs") {
                                    setView("blogs");
                                  }
                                }}
                              className="w-full text-left px-3 py-2 rounded hover:bg-gray-50"
                            >
                              
                              {it}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {/* Advertise as a separate button */}
              <button
                onClick={() => { setView("advertise"); setOpenDropdown(null); }}
                className="px-3 py-2 rounded-md text-gray-600 font-medium hover:text-black  transition bg-transparent border-none shadow-none"
                style={{background: 'none', boxShadow: 'none', border: 'none'}}>
                Advertise
              </button>
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                className="bg-green-500 hover:bg-green-600 text-white  px-4 py-2 rounded-md shadow-sm"
                onClick={() => (setView("submit"))}
              >
                + Submit Your Tool
              </button>
              <button className="px-3 py-2 rounded-md border border-gray-100 font-medium hover:bg-gray-100" onClick={() => (setView("signin"))}>
                Sign in
              </button>
              <button className="px-3 py-2 rounded-md font-medium bg-green-500 hover:bg-green-600 text-white hover:shadow-sm" onClick={() => (setView("signup"))}>
                Sign up
              </button>
            </div>
            <div className="flex-1" />
            {/* Mobile hamburger */}
            <div className="md:hidden ml-2">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="p-2 rounded-md hover:bg-gray-100"
              >
                {mobileOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile sliding panel */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 bg-white z-50 border-t shadow-lg transform transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              {/* Menu items */}
              {MENU.map((m) => (
                <div key={m.key} className="border-b last:border-b-0 pb-2">
                  <button
                    onClick={() => {
                      if (m.key === "Advertise") {
                        setView("advertise");
                        setMobileOpen(false);
                        setMobileAccordion(null);
                      } else if (m.key === "Launches") {
                        setView("launches");
                        setMobileOpen(false);
                        setMobileAccordion(null);
                      } else {
                        setMobileAccordion((p) => (p === m.key ? null : m.key));
                      }
                    }}
                    className="w-full flex items-center justify-between px-2 py-3 text-left"
                  >
                    <span className="font-medium">{m.label}</span>
                    <svg className={`h-5 w-5 transform transition-transform ${mobileAccordion === m.key ? "rotate-180" : "rotate-0"}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {mobileAccordion === m.key && m.items && (
                    <div className="mt-1 pl-4 pr-2 pb-2">
                      {m.items.map((it) => (
                        <button
                          key={it}
                          onClick={() => {
                            alert(`${m.label} → ${it}`);
                            setMobileOpen(false);
                            setMobileAccordion(null);
                          }}
                          className="block w-full text-left px-2 py-2 rounded hover:bg-gray-50"
                        >
                          {it}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* CTA buttons */}
              <div className="mt-3 flex flex-col gap-2">
                <button className="w-full bg-green-500 text-white px-4 py-2 rounded" onClick={() => alert("Submit your tool")}>
                  + Submit Your Tool
                </button>
                <button className="w-full px-4 py-2 rounded border" onClick={() => alert("Sign in")}>
                  Sign in
                </button>
                <button className="w-full px-4 py-2 rounded bg-white border" onClick={() => alert("Sign up")}>
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* tiny fade-in animation util */}
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-in { animation: fadeIn 160ms ease-out; }
        `}</style>
        </div>
      </header>
    );
  }