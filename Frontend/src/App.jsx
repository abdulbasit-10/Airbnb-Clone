// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./pages/hero";
import Listings from "./pages/listings";
import SignInPage from "./pages/signIn";
import SignUpPage from "./pages/signUp";
import Categories from "./pages/categories";
import AdvertisePage from "./pages/advertise";
import Launches from "./pages/Launches";
import News from "./pages/news";
import Blogs from "./pages/blogs";
import SubmitTool from "./pages/submitTool";
import Products from "./pages/products";

/** Home wrapper (same layout you had for View === "home") */
function Home() {
  return (
    <>
      <Hero />
      <Listings />
      <Categories />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative">
        {/* Header now uses react-router navigation internally.
            We don't need to pass setView anymore — header will call navigate().
            If you still need legacy setView behavior during migration, pass it here. */}
        <Header />

        <Routes>
          {/* Root / Home */}
          <Route path="/" element={<Home />} />

          {/* Launches (Launches component handles nested paths like /launches/latest) */}
          <Route path="/launches/*" element={<Launches />} />

          {/* Main pages */}
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/categories" element={<Categories />} />

          {/* Useful param routes (detail pages) */}
          <Route path="/products/:id" element={<Products />} />
          <Route path="/blogs/:id" element={<Blogs />} />
          <Route path="/news/:id" element={<News />} />
          <Route path="/categories/:category" element={<Categories />} />

          {/* Submit tool + auth (these components already accept navigation-friendly props) */}
          <Route path="/submit-tool" element={<SubmitTool />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Fallback — unknown routes go to home (change to NotFound if you want a 404 page) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
