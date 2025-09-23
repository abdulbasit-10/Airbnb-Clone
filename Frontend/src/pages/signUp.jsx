import React, { useState } from "react";

function SignUpModal({ open = false, onClose = () => {}, onSwitchToSignIn = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Replace this with real signup logic (API call)
    console.log("Sign up submit", { email, password });
    setTimeout(() => setLoading(false), 800);
    // Optionally close: onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-label="Create your account"
      onClick={onClose} // click outside to close
    >
      <div
        className="relative w-full max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:shadow"
            aria-label="Close signup modal"
          >
            ✕
          </button>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-800">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Welcome! Please fill in the details to get started.
            </p>

            {/* Google button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => console.log("Google signup clicked")}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-md shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
              >
                {/* small Google icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                  <path fill="#EA4335" d="M24 9.5c3.9 0 6.6 1.7 8.1 3l6-6C34.4 3 29.6 1 24 1 14 1 5.8 6.9 2.6 15.4l7.4 5.8C12.8 14 17.9 9.5 24 9.5z" />
                  <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v8h12.5c-.6 3-2.7 5.4-5.7 6.9l8 6c4.7-4.4 7.7-11.1 7.7-18.9z" />
                  <path fill="#4A90E2" d="M10 29.2c-.6-1.9-1-3.9-1-6.2 0-2.3.4-4.5 1-6.3L2.6 10.9C.9 15 0 19.4 0 24s.9 8.9 2.6 13.1L10 29.2z" />
                  <path fill="#FBBC05" d="M24 46c6.2 0 11.4-2.1 15.2-5.8l-8-6c-2.3 1.5-5.2 2.4-7.2 2.4-6.2 0-11.4-4.9-12.9-11.5l-7.4 5.8C5.8 41 14 46 24 46z" />
                </svg>
                <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs text-gray-400">or</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Email */}
            <label className="block mt-5 text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Email address"
            />

            {/* Password */}
            <label className="block mt-4 text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-2">
              <input
                type={showPwd ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-green-300"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Continue */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300 disabled:opacity-60"
            >
              {loading ? "Processing…" : "Continue"}
            </button>

            {/* Switch to sign in */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToSignIn();
                }}
                className="text-green-600 font-medium hover:underline"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-amber-50 border-t border-amber-100 px-6 py-3 text-center text-sm text-gray-600">
            <div className="flex items-center justify-center gap-2">
              <span>Secured by</span>
              <span className="font-semibold">clerk</span>
            </div>
            <div className="text-xs text-orange-600 mt-1">Development mode</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Page wrapper example: put this file at src/pages/SignUp.jsx and import in App.jsx */
export default function SignUpPage() {
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  console.log(showSignIn)

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {/* Open signup modal */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-6 py-3 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
      >
        Create account
      </button>

      <SignUpModal
        open={open}
        onClose={() => setOpen(false)}
        onSwitchToSignIn={() => {
          setShowSignIn(true);
          console.log("Switch to sign-in requested");
        }}
      />

      {/* Example: If you wanted to show a sign-in modal instead you can conditionally render it:
          showSignIn && <SignInModal ... />
      */}
    </div>
  );
}
